import { Inject } from 'Engine/Decorator/Inject';
import { Bounds } from 'Engine/Display/Bounds';
import { Component } from 'Engine/Core/Component';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { Vector } from 'Engine/Math/Vector';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { Ray } from 'Engine/Math/Ray';
import { Projection } from 'Engine/Math/Projection';
import { ColliderType } from 'Engine/Physics/ColliderType';
import { BroadPhaseCollisionResolver } from 'Engine/Physics/BroadPhaseCollisionResolver';
import { TransformComponent } from 'Engine/Display/TransformComponent';

interface InternalColliderComponent {
  rigidbody: RigidbodyComponent|undefined;
  transform: TransformComponent;
  type: ColliderType;
}

export class ColliderComponent extends Component {

  /**
   * AABB bounds for broadphase collition detection
   * It will be update by collider component.
   */
  public bounds: Bounds = new Bounds();

  /**
   * collider offset
   */
  public offset: Vector = new Vector();

  /**
   * A mask to determine which layer collider should calculate collision.
   */
  public layer: number = 1;

  // public debug: boolean = false;

  public restitution: number = 0.2;

  public friction: number = 0.99;

  public isKinematic: boolean = false;

  public readonly type: ColliderType = ColliderType.Static;

  /**
   * There are at least two kinds of collider:
   * 1. static collider     : without rigidbody
   * 2. rigidbody collider  : with rigidbody
   */
  public readonly rigidbody: RigidbodyComponent|undefined;

  public readonly transform: TransformComponent;

  @Inject(BroadPhaseCollisionResolver)
  private broadPhaseCollisionResolver: BroadPhaseCollisionResolver;

  /**
   * Calculate collision contact if body collided.
   */
  public collide(another: ColliderComponent): CollisionContact|undefined { return; }

  /**
   * Check point is contained in.
   */
  public contains(point: Vector): boolean { return false; }

  /**
   * Ray cast to and get intersect point.
   */
  public rayCast(ray: Ray): Vector|undefined { return; }

  /**
   * Project to given axis and return projection.
   */
  public project(axis: Vector): Projection { return new Projection(0, 0); }

  /**
   * Get furthest point through given direction.
   */
  public getFurthestPoint(direction: Vector): Vector { return this.bounds.center.clone(); }

  public start(): void {
    super.start();
    (<InternalColliderComponent>this).rigidbody = this.getComponent(RigidbodyComponent);
    if (this.rigidbody) {
      if (this.isKinematic) {
        (<InternalColliderComponent>this).type = ColliderType.Kinematic;
        this.rigidbody.sleepThreshold = -1;
      } else {
        (<InternalColliderComponent>this).type = ColliderType.Rigidbody;
      }
    }

    (<InternalColliderComponent>this).transform = <TransformComponent>this.getComponent(TransformComponent);

    /**
     * TODO: track after checked target has been added to scene
     */
    this.broadPhaseCollisionResolver.track(this);
  }

}
