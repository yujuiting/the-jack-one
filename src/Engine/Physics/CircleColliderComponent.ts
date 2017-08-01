import { GameObject } from 'Engine/Base/GameObject';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { Vector } from 'Engine/Math/Vector';
import { Ray } from 'Engine/Math/Ray';
import { Projection } from 'Engine/Math/Projection';
import { CollisionJumpTable } from 'Engine/Physics/CollisionJumpTable';
import { Inject } from 'Engine/Utility/Decorator/Inject';
import { forward } from 'Engine/Utility/Type';

/**
 * @see BoxColliderComponent
 */
forward(() => GameObject);

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

  public contains(point: Vector): boolean {
    return this.bounds.center.distanceTo(point) <= this.radius;
  }

  /**
   * @see https://en.wikipedia.org/wiki/Line–sphere_intersection
   * @param ray
   * @param maxDistance
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

  public project(axis: Vector): Projection {
    const dot = this.bounds.center.dot(axis);
    const s = [dot, dot + this.radius, dot - this.radius];
    return new Projection(Math.min(...s), Math.max(...s));
  }

  public getFurthestPoint(direction: Vector): Vector {
    return this.bounds.center.clone().add(direction.normalize().scale(this.radius));
  }

}
