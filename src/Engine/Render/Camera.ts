import { GameObject } from 'Engine/Base/GameObject';
import { Color } from 'Engine/Display/Color';
import { Matrix2D } from 'Engine/Math/Matrix2D';
import { Layer, AllBuiltInLayer, Class } from 'Engine/Utility/Type';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Pool } from 'Engine/Utility/Pool';
import { ReadonlyTree } from 'Engine/Utility/Tree';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';

/**
 * Camera
 */
export class Camera extends GameObject {

  public static readonly MainCamera: Camera = new Camera();

  public aspect: number = 16 / 9;

  public backgroundColor: Color = Color.Black;

  public toWorldMatrix: Matrix2D = new Matrix2D();

  public toViewportMatrix: Matrix2D = new Matrix2D();

  /**
   * Define which layers should be render.
   */
  public cullingMask: Layer = AllBuiltInLayer;

  /**
   * Define which layers could trigger mouse event.
   */
  public eventMask: Layer = AllBuiltInLayer;

  private canvas: HTMLCanvasElement = document.createElement('canvas');

  private ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

  private browser: BrowserDelegate = BrowserDelegate.Get();

  constructor() {
    super();
    // TODO: how to manage camera size?
    this.setSize(
      this.browser.window.innerWidth,
      this.browser.window.innerHeight
    );
  }

  public setSize(width: number, height: number): void {
    // TODO: API
    this.canvas.width = width;
    this.canvas.height = height;
    this.toViewportMatrix.reset();
    /**
     * Transform coordinate, reverse Y axis and set left-bottom as zero point..
     */
    this.toViewportMatrix.setTranslation(0, -height);
    this.toViewportMatrix.setScaling(0, -1);
  }

  public render(ctx: CanvasRenderingContext2D, gameObjects: ReadonlyTree<GameObject>): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /**
     * TODO: optimization
     * There should be some way to cahce which game object need to render
     */
    gameObjects.forEachChildren(gameObject => {
      if (!(gameObject.layer & this.cullingMask)) {
        return;
      }

      const renderer = <RendererComponent>gameObject.getComponent(<Class<RendererComponent>>RendererComponent);

      if (!renderer) {
        return;
      }

      renderer.render(this.ctx, this.toViewportMatrix);
    });

    ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }

}
