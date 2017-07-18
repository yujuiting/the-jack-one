import { Bounds } from 'Engine/Physics/Bounds';
import { Component } from 'Engine/Base/Component';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';

@RequireComponent([RigidbodyComponent])
export class ColliderComponent extends Component {

  public debug: boolean = false;

  protected rigidbody: RigidbodyComponent = <RigidbodyComponent>this.host.getComponent(RigidbodyComponent);

}
