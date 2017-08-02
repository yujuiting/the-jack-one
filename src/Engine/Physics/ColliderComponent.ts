import { Bounds } from 'Engine/Physics/Bounds';
import { Component } from 'Engine/Base/Component';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';
import { Vector } from 'Engine/Math/Vector';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { Ray } from 'Engine/Math/Ray';
import { Projection } from 'Engine/Math/Projection';

@RequireComponent([RigidbodyComponent])
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

  public debug: boolean = false;

  public restitution: number;

  public friction: number;

  /**
   * There are at least two kinds of collider:
   * 1. static collider     : without rigidbody
   * 2. rigidbody collider  : with rigidbody
   */
  public readonly rigidbody: RigidbodyComponent = <RigidbodyComponent>this.host.getComponent(RigidbodyComponent);

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

}
