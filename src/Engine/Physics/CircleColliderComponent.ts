import { GameObject } from 'Engine/Core/GameObject';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { Vector } from 'Engine/Math/Vector';
import { Ray } from 'Engine/Math/Ray';
import { Projection } from 'Engine/Math/Projection';
import { CollisionJumpTable } from 'Engine/Physics/CollisionJumpTable';
import { Inject } from 'Engine/Decorator/Inject';
import { forwardRef } from 'Engine/Utility/Type';
import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { Color } from 'Engine/Display/Color';

interface InternalCircleColliderComponent {
  calculatedRadius: number;
}

/**
 * @see BoxColliderComponent
 */
forwardRef(() => GameObject);

export class CircleColliderComponent extends ColliderComponent {

  public radius: number = 0;

  /**
   * Calaulated radius.
   */
  public readonly calculatedRadius = 0;

  constructor(host: GameObject,
              @Inject(CollisionJumpTable) private collisionJumpTable: CollisionJumpTable) {
    super(host);
  }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);

    const scale = (this.transform.scale.x + this.transform.scale.y) * 0.5;
    (<InternalCircleColliderComponent>this).calculatedRadius = this.radius * scale;
    // update bounds
    this.bounds.center.copy(this.host.transform.position);
    this.bounds.extents.setTo(this.calculatedRadius, this.calculatedRadius);
  }

  /**
   * @override
   * @inheritdoc
   */
  public collide(another: ColliderComponent): CollisionContact|undefined {
    if (another instanceof CircleColliderComponent) {
      return this.collisionJumpTable.circleCircle(this, another);
    } else if (another instanceof PolygonColliderComponent) {
      return this.collisionJumpTable.circlePolygon(this, another);
    }
  }

  /**
   * @override
   * @inheritdoc
   */
  public contains(point: Vector): boolean {
    return this.bounds.center.distanceTo(point) <= this.calculatedRadius;
  }

  /**
   * @see https://en.wikipedia.org/wiki/Line–sphere_intersection
   * @override
   * @inheritdoc
   */
  public rayCast(ray: Ray): Vector|undefined {
    const c = this.bounds.center;
    const r = this.calculatedRadius;
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
    const s = [dot, dot + this.calculatedRadius, dot - this.calculatedRadius];
    return new Projection(Math.min(...s), Math.max(...s));
  }

  /**
   * @override
   * @inheritdoc
   */
  public getFurthestPoint(direction: Vector): Vector {
    return this.bounds.center.clone().add(direction.clone().normalize().multiply(this.calculatedRadius));
  }

}
