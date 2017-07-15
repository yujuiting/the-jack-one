import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';
import { Vector } from 'Engine/Math/Vector';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';

/**
 * Basic transform object
 */
@UniqueComponent()
export class TransformComponent extends Component {

  public anchor: Vector;

  public position: Vector;

  public scale: Vector;

  public rotation: number;

  public width: number;

  public height: number;

  public reset(): void {
    super.reset();
    this.anchor = Vector.Get();
    this.position = Vector.Get();
    this.scale = Vector.Get();
    this.width = 0;
    this.height = 0;
  }

  public destroy(): void {
    super.destroy();
    this.anchor.destroy();
    this.position.destroy();
    this.scale.destroy();
    delete this.anchor;
    delete this.position;
    delete this.scale;
    delete this.width;
    delete this.height;
  }

}
