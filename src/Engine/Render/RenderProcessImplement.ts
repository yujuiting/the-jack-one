import { RenderProcess } from 'Engine/Render/RenderProcess';
import { GameObject } from 'Engine/Core/GameObject';
import { Camera } from 'Engine/Core/Camera';
import { ReadonlyTree } from 'Engine/Utility/Tree';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Service } from 'Engine/Decorator/Service';
import { Vector } from 'Engine/Math/Vector';
import { Type } from 'Engine/Utility/Type';
import { ifdef, DEBUG, DEBUG_RENDERER } from 'Engine/runtime';
import { Bounds } from 'Engine/Display/Bounds';
import { Inject } from 'Engine/Decorator/Inject';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';

interface RenderProcessCache {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

@Service(RenderProcess)
export class RenderProcessImplement implements RenderProcess {

  private ctx: CanvasRenderingContext2D|undefined;

  private width = 0;

  private height = 0;

  private caches = new Map<Camera, RenderProcessCache>();

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

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

    const cache = this.getCache(camera);

    const { width, height } = camera.rect;

    cache.canvas.width = width;
    cache.canvas.height = height;
    cache.ctx.clearRect(0, 0, width, height);

    // TODO: handle window.devicePixelRatio

    cache.ctx.save();

    // draw background
    cache.ctx.fillStyle = camera.backgroundColor.toHexString();
    cache.ctx.fillRect(0, 0, this.width, this.height);

    cache.ctx.restore();

    cache.ctx.save();

    // render game objects
    gameObjects.forEachChildren(gameObject => {
      if (gameObject.layer & camera.cullingMask) {
        this.renderGameObject(cache.ctx, camera, gameObject);
      }
    });

    cache.ctx.restore();

    const { x, y } = camera.rect.position;

    ctx.drawImage(cache.canvas, 0, 0, width, height, x, y, width, height);
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
      // TODO: use matrix
      ctx.save();
      // move to position
      ctx.translate(position.x, position.y);
      // Perform y-axis up rotation.
      ctx.rotate(-rotation);

      ctx.scale(scale.x, scale.y);
      // TODO: use pivot
      ctx.drawImage(image, -width * 0.5, -height * 0.5, width, height);

      ctx.restore();

      ifdef(DEBUG_RENDERER, () => this.drawDebugOutline(ctx, camera, renderer.bounds));
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

  private getCache(camera: Camera): RenderProcessCache {
    let cache = this.caches.get(camera);

    if (!cache) {
      const canvas = this.browserDelegate.createCanvas();
      const ctx = this.browserDelegate.getContext(canvas);
      cache = { canvas, ctx };
      this.caches.set(camera, cache);
    }

    return cache;
  }

}
