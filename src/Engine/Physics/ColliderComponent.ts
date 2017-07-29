import { Bounds } from 'Engine/Physics/Bounds';
import { Component } from 'Engine/Base/Component';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';

@RequireComponent([RigidbodyComponent])
export class ColliderComponent extends Component {

  /**
   * AABB bounds for broadphase collition detection
   */
  public bounds: Bounds = new Bounds();

  /**
   * which layer collider should calculate collision.
   */
  public layer: number = 1;

  public debug: boolean = false;

  public restitution: number;

  public friction: number;

  public readonly rigidbody: RigidbodyComponent = <RigidbodyComponent>this.host.getComponent(RigidbodyComponent);

}
