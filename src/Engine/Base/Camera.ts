import { GameObject } from 'Engine/Base/GameObject';
import { Color } from 'Engine/Display/Color';
import { Matrix2D } from 'Engine/Math/Matrix2D';
import { Layer, AllBuiltInLayer, Class } from 'Engine/Utility/Type';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Pool } from 'Engine/Utility/Pool';
import { ReadonlyTree } from 'Engine/Utility/Tree';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Screen } from 'Engine/Base/Screen';
import { Vector } from 'Engine/Math/Vector';
import { Rect } from 'Engine/Math/Rect';
import { Inject } from 'Engine/Utility/Decorator/Inject';
import { providerRegistry } from 'Engine/Utility/ProviderRegistry';

/**
 * Camera
 */
export class Camera extends GameObject {

  public static readonly MainCamera: Camera = providerRegistry.instantiate(Camera);

  public aspect: number = 16 / 9;

  public backgroundColor: Color = Color.Black;

  public toWorldMatrix: Matrix2D = new Matrix2D();

  public toScreenMatrix: Matrix2D = new Matrix2D();

  /**
   * Define which layers should be render.
   */
  public cullingMask: Layer = AllBuiltInLayer;

  /**
   * Define which layers could trigger mouse event.
   */
  public eventMask: Layer = AllBuiltInLayer;

  public rect: Rect = new Rect();

  private canvas: HTMLCanvasElement = document.createElement('canvas');

  private ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

  constructor(@Inject(BrowserDelegate) private browser: BrowserDelegate,
              @Inject(Screen) private screen: Screen) {
    super();
    // TODO: how to manage camera size?
    setTimeout(() => this.setSize(
      this.screen.width,
      this.screen.height
    ));
  }

  public setSize(width: number, height: number): void {
    // TODO: API
    this.canvas.width = width;
    this.canvas.height = height;
    this.toScreenMatrix.reset();
    /**
     * Transform coordinate, reverse Y axis and set center as zero point.
     */
    this.toScreenMatrix.setTranslation(-width / 2, -height / 2);
    this.toScreenMatrix.setScaling(0, -1);
    this.toScreenMatrix.save();

    /**
     * Set rect as size * 2, prevent remove target but its body still in camera.
     */
    this.rect.width = width * 2;
    this.rect.height = height * 2;
  }

  public update(): void {
    /**
     * Perform camera movement.
     */
    const x = this.transform.position.x;
    const y = this.transform.position.y;
    this.rect.position.setTo(
      x - this.rect.width / 2,
      y - this.rect.height / 2
    );
    this.toScreenMatrix.restore();
    this.toScreenMatrix.setTranslation(x, y);
  }

  public render(ctx: CanvasRenderingContext2D, gameObjects: ReadonlyTree<GameObject>): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const min = this.rect.min;
    const max = this.rect.max;

    /**
     * TODO: optimization
     * There should be some way to cahce which game object need to render
     */
    gameObjects.forEachChildren(gameObject => {
      if (!(gameObject.layer & this.cullingMask)) {
        return;
      }

      /**
       * Check object is in camera's view.
       */
      if (gameObject.transform.position.x < min.x ||
          gameObject.transform.position.y < min.y ||
          gameObject.transform.position.x > max.x ||
          gameObject.transform.position.y > max.y) {
        return;
      }

      const renderers = gameObject.getComponents(<Class<RendererComponent>>RendererComponent);

      renderers.forEach(renderer => renderer.render(this.ctx, this.toScreenMatrix));
    });

    ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }

  public screenToWorld(point: Vector): Vector {
    const result = point.clone();
    this.toWorldMatrix.multiplyToPoint(result);
    return result;
  }

  public worldToScreen(point: Vector): Vector {
    const result = point.clone();
    this.toScreenMatrix.multiplyToPoint(result);
    return result;
  }

}
