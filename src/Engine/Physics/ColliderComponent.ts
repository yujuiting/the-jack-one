import { Bounds } from 'Engine/Physics/Bounds';
import { Component } from 'Engine/Base/Component';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';
import { Vector } from 'Engine/Math/Vector';

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

}
