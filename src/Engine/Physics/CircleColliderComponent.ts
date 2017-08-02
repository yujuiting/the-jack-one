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

/**
 * @see BoxColliderComponent
 */
forwardRef(() => GameObject);

export class CircleColliderComponent extends ColliderComponent {

  public radius: number = 0;

  private debugRenderer: CircleRendererComponent|null = null;

  constructor(host: GameObject,
              @Inject(CollisionJumpTable) private collisionJumpTable: CollisionJumpTable) {
    super(host);
  }

  public fixedUpdate(): void {
    this.calculate();
  }

  public update(): void {
    if (this.debug) {
      if (!this.debugRenderer) {
        this.debugRenderer = this.addComponent(CircleRendererComponent);
      }
      this.debugRenderer.center.copy(this.bounds.center);
      this.debugRenderer.radius = this.radius;
    } else {
      if (this.debugRenderer) {
        this.removeComponent(this.debugRenderer);
        this.debugRenderer = null;
      }
    }
  }

  public calculate(): void {
    // update bounds
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
