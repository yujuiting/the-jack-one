import { GameObject } from 'Engine/Core/GameObject';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { Vector } from 'Engine/Math/Vector';
import { Line } from 'Engine/Math/Line';
import { Ray } from 'Engine/Math/Ray';
import { Projection } from 'Engine/Math/Projection';
import { CollisionJumpTable } from 'Engine/Physics/CollisionJumpTable';
import { Inject } from 'Engine/Decorator/Inject';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { forwardRef } from 'Engine/Utility/Type';
import { Color } from 'Engine/Display/Color';

/**
 * @see BoxColliderComponent
 */
forwardRef(() => GameObject);

export class PolygonColliderComponent extends ColliderComponent {

  /**
   * Points for polygon shape definition.
   */
  public points: Vector[] = [];

  /**
   * Cache points, axes and sides in world coordinate information for physics calculation.
   */
  protected readonly _cachedPoints: Vector[] = [];
  protected readonly _cachedAxes: Vector[] = [];
  protected readonly _cachedSides: Line[] = [];

  /**
   * Debug draw collider shape
   */
  protected debugColliderRenderer: LineRendererComponent|null = null;

  /**
   * Debug draw AABB
   */
  protected debugBoundsRenderer: LineRendererComponent|null = null;

  /**
   * Debug draw collider direction
   */
  protected debugDirectionRenderer: LineRendererComponent|null = null;

  public get cachedPoints(): ReadonlyArray<Vector> { return this._cachedPoints; }

  public get cachedAxes(): ReadonlyArray<Vector> { return this._cachedAxes; }

  public get cachedSides(): ReadonlyArray<Line> { return this._cachedSides; }

  constructor(host: GameObject,
              @Inject(CollisionJumpTable) protected collisionJumpTable: CollisionJumpTable) {
    super(host);
  }

  public fixedUpdate(): void {
    this.calculate();
  }

  public update(): void {
    if (this.debug) {
      const isSleep = this.rigidbody ? this.rigidbody.isSleeping : true;
      const color = isSleep ? Color.Green : Color.Red;

      if (!this.debugColliderRenderer) {
        this.debugColliderRenderer = this.addComponent(LineRendererComponent);
        this.debugColliderRenderer.useLocalCoordinate = false;
        this.debugColliderRenderer.closePath = true;
      }

      if (!this.debugBoundsRenderer) {
        this.debugBoundsRenderer = this.addComponent(LineRendererComponent);
        this.debugBoundsRenderer.useLocalCoordinate = false;
        this.debugBoundsRenderer.closePath = true;
        this.debugBoundsRenderer.strokeColor = Color.Cyan;
      }

      if (!this.debugDirectionRenderer) {
        this.debugDirectionRenderer = this.addComponent(LineRendererComponent);
        this.debugDirectionRenderer.useLocalCoordinate = false;
      }

      this.debugColliderRenderer.strokeColor = color;
      this.debugDirectionRenderer.strokeColor = color;

      this.debugColliderRenderer.clearPoints();
      if (this._cachedPoints.length > 1) {
        this.debugColliderRenderer.addPoint(...this._cachedPoints);
      }

      const min = this.bounds.min;
      const max = this.bounds.max;

      this.debugBoundsRenderer.clearPoints();
      this.debugBoundsRenderer.addPoint(
        new Vector(min.x, min.y),
        new Vector(min.x, max.y),
        new Vector(max.x, max.y),
        new Vector(max.x, min.y)
      );

      const rotation = this.host.transform.rotation;
      const direction = new Vector(Math.cos(rotation), Math.sin(rotation));
      const ray = new Ray(this.bounds.center.clone(), direction.clone());
      const point = this.rayCast(ray) || direction;
      const center = this._cachedPoints.reduce((result, curr) => result.add(curr), new Vector()).multiply(1 / this._cachedPoints.length);
      this.debugDirectionRenderer.clearPoints();
      this.debugDirectionRenderer.addPoint(center, point);

    } else {
      if (this.debugColliderRenderer) {
        this.removeComponent(this.debugColliderRenderer);
        this.debugColliderRenderer = null;
      }
      if (this.debugBoundsRenderer) {
        this.removeComponent(this.debugBoundsRenderer);
        this.debugBoundsRenderer = null;
      }
      if (this.debugDirectionRenderer) {
        this.removeComponent(this.debugDirectionRenderer);
        this.debugDirectionRenderer = null;
      }
    }
  }

  public calculate(): void {
    const toWorldMatrix = this.host.transform.toWorldMatrix;
    const count = this.points.length;
    const diff = count - this._cachedPoints.length;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this._cachedPoints.push(new Vector());
        this._cachedAxes.push(new Vector());
        this._cachedSides.push(new Line(new Vector(), new Vector()));
      }
    } else if (diff < 0) {
      this._cachedPoints.splice(0, -diff);
      this._cachedAxes.splice(0, -diff);
      this._cachedSides.splice(0, -diff);
    }

    this._cachedPoints.forEach((point, index) => point.copy(this.points[index]));
    this._cachedPoints.forEach(point => toWorldMatrix.multiplyToPoint(point));

    for (let i = 0; i < count; i++) {
      const p1 = this._cachedPoints[i];
      const p2 = this._cachedPoints[(i + 1) % count];
      const axis = this._cachedAxes[i];
      const side = this._cachedSides[i];
      axis.copy(p1).subtract(p2);
      side.begin.copy(p1);
      side.end.copy(p2);
    }

    // update bounds
    const x = this._cachedPoints.map(p => p.x);
    const y = this._cachedPoints.map(p => p.y);
    const minX = Math.min(...x);
    const minY = Math.min(...y);
    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    this.bounds.center.setTo((maxX + minX) / 2, (maxY + minY) / 2);
    this.bounds.extents.setTo((maxX - minX) / 2, (maxY - minY) / 2);
  }

  /**
   * @override
   * @inheritdoc
   */
  public collide(another: ColliderComponent): CollisionContact|undefined {
    if (another instanceof PolygonColliderComponent) {
      return this.collisionJumpTable.polygonPolygon(this, another);
    } else if (another instanceof CircleColliderComponent) {
      return this.collisionJumpTable.circlePolygon(another, this);
    }
  }

  /**
   * @override
   * @inheritdoc
   */
  public contains(point: Vector): boolean {
    const ray = new Ray(point, Vector.Right);
    const count = this._cachedSides.reduce((acc, side) => ray.intersect(side) === -1 ? acc : ++acc, 0);
    return count % 2 !== 0;
  }

  /**
   * @override
   * @inheritdoc
   */
  public rayCast(ray: Ray): Vector|undefined {
    let minDistance = Number.MAX_VALUE;
    let noIntersect = true;
    this._cachedSides.forEach(side => {
      const distance = ray.intersect(side);
      if (distance > 0 && distance < minDistance) {
        minDistance = distance;
        noIntersect = false;
      }
    });

    if (noIntersect) {
      return;
    }

    return ray.getPoint(minDistance);
  }

  /**
   * @override
   * @inheritdoc
   */
  public project(axis: Vector): Projection {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    this._cachedPoints.forEach(point => {
      const s = point.dot(axis);
      min = Math.min(min, s);
      max = Math.max(max, s);
    });

    return new Projection(min, max);
  }

  /**
   * @override
   * @inheritdoc
   */
  public getFurthestPoint(direction: Vector): Vector {
    let max = -Number.MAX_VALUE;
    let pointer = -1;
    this._cachedPoints.forEach((point, index) => {
      const dot = point.dot(direction);
      if (dot > max) {
        max = dot;
        pointer = index;
      }
    });
    return this._cachedPoints[pointer].clone();
  }

}
