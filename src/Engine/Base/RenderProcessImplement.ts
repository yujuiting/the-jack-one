import { RenderProcess } from 'Engine/Base/RenderProcess';
import { GameObject } from 'Engine/Base/GameObject';
import { Camera } from 'Engine/Base/Camera';
import { ReadonlyTree } from 'Engine/Utility/Tree';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Service } from 'Engine/Decorator/Service';
import { Vector } from 'Engine/Math/Vector';
import { Type } from 'Engine/Utility/Type';
import { ifdef, DEBUG } from 'Engine/Base/runtime';
import { Bounds } from 'Engine/Display/Bounds';

@Service(RenderProcess)
export class RenderProcessImplement implements RenderProcess {

  private ctx: CanvasRenderingContext2D|undefined;

  private width = 0;

  private height = 0;

  public useContext(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  /**
   * @param camera Current render camera.
   * @param gameObjects Game objects this camera has visibility.
   */
  public render(camera: Camera, gameObjects: ReadonlyTree<GameObject>): void {
    if (!this.ctx) {
      return;
    }

    const ctx = this.ctx;

    // TODO: handle window.devicePixelRatio

    ctx.save();

    // draw background
    ctx.fillStyle = camera.backgroundColor.toHexString();
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.restore();

    ctx.save();

    // render game objects
    gameObjects.forEachChildren(gameObject => {
      this.renderGameObject(ctx, camera, gameObject);
    });

    ctx.restore();
  }

  private renderGameObject(ctx: CanvasRenderingContext2D, camera: Camera, gameObject: GameObject): void {
    const renderers = gameObject.getComponents(<Type<RendererComponent>>RendererComponent);

    const { rotation, scale, position: worldPosition } = gameObject.transform;

    const position = Vector.Get().copy(worldPosition);
    camera.toScreenMatrix.multiplyToPoint(position);

    renderers.forEach(renderer => {
      renderer.render();

      const image = renderer.canvas;
      const { width, height } = image;
      ctx.save();
      // move to position
      ctx.translate(position.x, position.y);
      // Perform y-axis up rotation.
      ctx.rotate(-rotation);

      ctx.scale(scale.x, scale.y);
      // TODO: use pivot
      ctx.drawImage(image, -width * 0.5, -height * 0.5, width, height);

      ctx.restore();

      ifdef(DEBUG, () => this.drawDebugOutline(ctx, camera, renderer.bounds));
    });
  }

  private drawDebugOutline(ctx: CanvasRenderingContext2D, camera: Camera, bounds: Bounds): void {
    // min and max are in world space
    const { min, max } = bounds;
    // transform to screen space
    camera.toScreenMatrix.multiplyToPoint(min);
    camera.toScreenMatrix.multiplyToPoint(max);
    // debug draw
    ctx.beginPath();
    ctx.moveTo(min.x, min.y);
    ctx.lineTo(max.x, min.y);
    ctx.lineTo(max.x, max.y);
    ctx.lineTo(min.x, max.y);
    ctx.lineTo(min.x, min.y);
    ctx.closePath();
    ctx.save();
    ctx.strokeStyle = '#f00';
    ctx.stroke();
    ctx.restore();
  }

}
