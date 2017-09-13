import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Bounds } from 'Engine/Display/Bounds';
import { RequireComponent } from 'Engine/Decorator/RequireComponent';
import { Matrix } from 'Engine/Math/Matrix';

/**
 * Base renderer
 */
@RequireComponent([TransformComponent])
export class RendererComponent extends Component {

  public transform: TransformComponent;

  /**
   * renderer bounds in world coordinate.
   */
  public bounds: Bounds = new Bounds();

  public isVisible: boolean = false;

  public start(): void {
    super.start();
    this.transform = <TransformComponent>this.getComponent(TransformComponent);
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void { return; }

  public onBecameVisible(): void { return; }

  public onBecameInvisible(): void { return; }

}
