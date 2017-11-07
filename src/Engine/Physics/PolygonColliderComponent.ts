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
   * Points for polygon shape definition in local space.
   */
  public points: Vector[] = [];

  protected readonly _calculatedPoints: Vector[] = [];
  protected readonly _calculatedAxes: Vector[] = [];
  protected readonly _calculatedSides: Line[] = [];

  /**
   * Calculated points, axes and sides in world coordinate information for physics calculation.
   */
  public get calculatedPoints(): ReadonlyArray<Vector> { return this._calculatedPoints; }
  public get calculatedAxes(): ReadonlyArray<Vector> { return this._calculatedAxes; }
  public get calculatedSides(): ReadonlyArray<Line> { return this._calculatedSides; }

  constructor(host: GameObject,
              @Inject(CollisionJumpTable) protected collisionJumpTable: CollisionJumpTable) {
    super(host);
  }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);
    this.calculate();
  }

  public calculate(): void {
    const toWorldMatrix = this.host.transform.toWorldMatrix;
    const count = this.points.length;
    const diff = count - this._calculatedPoints.length;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this._calculatedPoints.push(new Vector());
        this._calculatedAxes.push(new Vector());
        this._calculatedSides.push(new Line(new Vector(), new Vector()));
      }
    } else if (diff < 0) {
      this._calculatedPoints.splice(0, -diff);
      this._calculatedAxes.splice(0, -diff);
      this._calculatedSides.splice(0, -diff);
    }

    this._calculatedPoints.forEach((point, index) => point.copy(this.points[index]));
    this._calculatedPoints.forEach(point => toWorldMatrix.multiplyToPoint(point));

    for (let i = 0; i < count; i++) {
      const p1 = this._calculatedPoints[i];
      const p2 = this._calculatedPoints[(i + 1) % count];
      const axis = this._calculatedAxes[i];
      const side = this._calculatedSides[i];
      axis.copy(p1).subtract(p2);
      side.begin.copy(p1);
      side.end.copy(p2);
    }

    // update bounds
    const x = this._calculatedPoints.map(p => p.x);
    const y = this._calculatedPoints.map(p => p.y);
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
    const count = this._calculatedSides.reduce((acc, side) => ray.intersect(side) === -1 ? acc : ++acc, 0);
    return count % 2 !== 0;
  }

  /**
   * @override
   * @inheritdoc
   */
  public rayCast(ray: Ray): Vector|undefined {
    let minDistance = Number.MAX_VALUE;
    let noIntersect = true;
    this._calculatedSides.forEach(side => {
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
    this._calculatedPoints.forEach(point => {
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
    this._calculatedPoints.forEach((point, index) => {
      const dot = point.dot(direction);
      if (dot > max) {
        max = dot;
        pointer = index;
      }
    });
    return this._calculatedPoints[pointer].clone();
  }

}
