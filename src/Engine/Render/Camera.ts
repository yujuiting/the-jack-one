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

  /**
   * Default which layers should be render.
   */
  public cullingMask: Layer = AllBuiltInLayer;

  /**
   * Default which layers could trigger mouse event.
   */
  public eventMask: Layer = AllBuiltInLayer;

  public fromWorldMatrix: Matrix2D = new Matrix2D();

  private canvas: HTMLCanvasElement = document.createElement('canvas');

  private ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

  private browser: BrowserDelegate = BrowserDelegate.Get();

  constructor() {
    super();
    // TODO: how to manage camera size?
    this.canvas.width = this.browser.window.innerWidth;
    this.canvas.height = this.browser.window.innerHeight;
  }

  public setSize(width: number, height: number): void {
    // TODO: API
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public render(ctx: CanvasRenderingContext2D, gameObjects: ReadonlyTree<GameObject>): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    gameObjects.forEach(gameObject => this.renderGameObject(gameObject));

    ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }

  private renderGameObject(gameObject: GameObject): void {
    // renderComponent of gameObject should be check before.
    const renderComponent = <RendererComponent>gameObject.getComponent(<Class<RendererComponent>>RendererComponent);
    renderComponent.render(this.ctx);
  }

}
