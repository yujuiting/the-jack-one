import { Bounds } from 'Engine/Physics/Bounds';
import { Component } from 'Engine/Base/Component';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';

@RequireComponent([RigidbodyComponent])
export class ColliderComponent extends Component {

  public bounds: Bounds;

  protected rigidbody: RigidbodyComponent = <RigidbodyComponent>this.host.getComponent(RigidbodyComponent);

  public reset(): void {
    super.reset();
    this.bounds = new Bounds();
  }

  public destroy(): void {
    super.destroy();
    this.bounds.destroy();
  }

}
