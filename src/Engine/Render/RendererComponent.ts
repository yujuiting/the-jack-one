import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';
import { Matrix } from 'Engine/Math/Matrix';

/**
 * Base renderer
 */
@RequireComponent([TransformComponent])
export class RendererComponent extends Component {

  public readonly transform: TransformComponent = <TransformComponent>this.getComponent(TransformComponent);

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {
    //
  }

}
