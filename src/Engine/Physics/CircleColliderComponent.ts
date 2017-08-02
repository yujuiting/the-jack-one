import { GameObject } from 'Engine/Base/GameObject';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { Vector } from 'Engine/Math/Vector';
import { Ray } from 'Engine/Math/Ray';
import { Projection } from 'Engine/Math/Projection';
import { CollisionJumpTable } from 'Engine/Physics/CollisionJumpTable';
import { Inject } from 'Engine/Utility/Decorator/Inject';
import { forwardRef } from 'Engine/Utility/Type';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { Color } from 'Engine/Display/Color';

/**
 * @see BoxColliderComponent
 */
forwardRef(() => GameObject);

export class CircleColliderComponent extends ColliderComponent {

  public radius: number = 0;

  private debugColliderRenderer: CircleRendererComponent|null = null;

  private debugBoundsRenderer: LineRendererComponent|null = null;

  constructor(host: GameObject,
              @Inject(CollisionJumpTable) private collisionJumpTable: CollisionJumpTable) {
    super(host);
  }

  public fixedUpdate(): void {
    this.calculate();
  }

  public update(): void {
    if (this.debug) {
      if (!this.debugColliderRenderer) {
        this.debugColliderRenderer = this.addComponent(CircleRendererComponent);
        this.debugColliderRenderer.useLocalCoordinate = false;
      }

      if (!this.debugBoundsRenderer) {
        this.debugBoundsRenderer = this.addComponent(LineRendererComponent);
        this.debugBoundsRenderer.useLocalCoordinate = false;
        this.debugBoundsRenderer.closePath = true;
        this.debugBoundsRenderer.strokeColor = Color.Cyan;
      }

      this.debugColliderRenderer.center.copy(this.bounds.center);
      this.debugColliderRenderer.radius = this.radius;

      this.debugBoundsRenderer.clearPoints();
      const min = this.bounds.min;
      const max = this.bounds.max;
      this.debugBoundsRenderer.addPoint(
        new Vector(min.x, min.y),
        new Vector(min.x, max.y),
        new Vector(max.x, max.y),
        new Vector(max.x, min.y)
      );

    } else {
      if (this.debugColliderRenderer) {
        this.removeComponent(this.debugColliderRenderer);
        this.debugColliderRenderer = null;
      }
      if (this.debugBoundsRenderer) {
        this.removeComponent(this.debugBoundsRenderer);
        this.debugBoundsRenderer = null;
      }
    }
  }

  public calculate(): void {
    // update bounds
    this.bounds.center.copy(this.host.transform.position);
    this.bounds.extents.setTo(this.radius, this.radius);
  }

  /**
   * @override
   * @inheritdoc
   */
  public collide(another: ColliderComponent): CollisionContact|undefined {
    if (another instanceof CircleColliderComponent) {
      return this.collisionJumpTable.circleCircle(this, another);
    } else if (another instanceof BoxColliderComponent) {
      return this.collisionJumpTable.circleBox(this, another);
    }
  }

  /**
   * @override
   * @inheritdoc
   */
  public contains(point: Vector): boolean {
    return this.bounds.center.distanceTo(point) <= this.radius;
  }

  /**
   * @see https://en.wikipedia.org/wiki/Line–sphere_intersection
   * @override
   * @inheritdoc
   */
  public rayCast(ray: Ray, max: number = Infinity): Vector|undefined {
    const c = this.bounds.center;
    const r = this.radius;
    const o = ray.origin;
    const l = ray.direction;
    const co = o.clone().subtract(c);
    const discriminant = Math.sqrt(Math.pow(l.dot(co), 2) - Math.pow(co.magnitude(), 2) + Math.pow(r, 2));

    if (discriminant < 0) {
      return;
    }

    let d = -l.dot(co);

    if (discriminant > 0) {
      const d1 = d + discriminant;
      const d2 = d - discriminant;
      d = Math.min(d1, d2);
    }

    return ray.getPoint(d);
  }

  /**
   * @override
   * @inheritdoc
   */
  public project(axis: Vector): Projection {
    const dot = this.bounds.center.dot(axis);
    const s = [dot, dot + this.radius, dot - this.radius];
    return new Projection(Math.min(...s), Math.max(...s));
  }

  /**
   * @override
   * @inheritdoc
   */
  public getFurthestPoint(direction: Vector): Vector {
    return this.bounds.center.clone().add(direction.normalize().scale(this.radius));
  }

}
