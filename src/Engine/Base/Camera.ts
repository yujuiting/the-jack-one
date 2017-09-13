import { GameObject } from 'Engine/Base/GameObject';
import { Screen } from 'Engine/Base/Screen';
import { GameObjectInitializer } from 'Engine/Base/GameObjectInitializer';
import { Color } from 'Engine/Display/Color';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Bounds } from 'Engine/Display/Bounds';
import { Vector } from 'Engine/Math/Vector';
import { Rect } from 'Engine/Math/Rect';
import { Matrix } from 'Engine/Math/Matrix';
import { Layer, AllBuiltInLayer, Type } from 'Engine/Utility/Type';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Pool } from 'Engine/Utility/Pool';
import { ReadonlyTree } from 'Engine/Utility/Tree';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Inject } from 'Engine/Decorator/Inject';
import { Service } from 'Engine/Decorator/Service';

export const MainCamera = Symbol('MainCamera');

/**
 * Camera
 */
@Service(MainCamera)
export class Camera extends GameObject {

  public aspect: number = 16 / 9;

  public backgroundColor: Color = Color.Black;

  public toWorldMatrix: Matrix = new Matrix();

  public toScreenMatrix: Matrix = new Matrix();

  /**
   * Define which layers should be render.
   */
  public cullingMask: Layer = AllBuiltInLayer;

  /**
   * Define which layers could trigger mouse event.
   */
  public eventMask: Layer = AllBuiltInLayer;

  /**
   * Where on the screen is the camera rendered in normalized coordinates.
   */
  public rect: Rect = new Rect();

  /**
   * Camera visible area bounds in world coordinate.
   */
  public bounds: Bounds = new Bounds();

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  constructor(private browser: BrowserDelegate,
              private screen: Screen,
              gameObjectInitializer: GameObjectInitializer) {
    super(gameObjectInitializer);
    this.canvas = browser.document.createElement('canvas');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  public start(): void {
    super.start();
    this.setSize(this.screen.width, this.screen.height);
  }

  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.toScreenMatrix.reset();

    /**
     * TODO:
     * Rect should update according camera mode. e.g. full screen mode.
     */
    this.rect.width = this.screen.width;
    this.rect.height = this.screen.height;

    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;

    /**
     * Transform coordinate, reverse Y axis and set center as zero point.
     */
    this.toScreenMatrix.setTranslation(halfWidth, halfHeight);
    this.toScreenMatrix.setScaling(0, -1);
    this.toScreenMatrix.save();

    this.bounds.extents.setTo(halfWidth, halfHeight);
  }

  public update(): void {
    /**
     * Perform camera movement.
     */
    this.toScreenMatrix.restore();
    this.toScreenMatrix.setTranslation(this.transform.position);
    this.toScreenMatrix.setRotatation(this.transform.rotation);
    this.toScreenMatrix.setScaling(this.transform.scale);

    this.toWorldMatrix.invertFrom(this.toScreenMatrix);

    this.bounds.center.copy(this.transform.position);
  }

  public render(ctx: CanvasRenderingContext2D, gameObjects: ReadonlyTree<GameObject>): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.fillStyle = this.backgroundColor.toHexString();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    gameObjects.forEachChildren(gameObject => {
      if ((gameObject.layer & this.cullingMask) === 0) {
        return;
      }

      const renderers = gameObject.getComponents(<Type<RendererComponent>>RendererComponent)
                                  .filter(renderer => this.checkGameObjectVisible(renderer));

      renderers.forEach(renderer => renderer.render(this.ctx, this.toScreenMatrix));
    });

    ctx.drawImage(
      this.canvas,
      0, 0,
      this.canvas.width,
      this.canvas.height,
      this.rect.position.x,
      this.rect.position.y,
      this.rect.width,
      this.rect.height
    );
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

  /**
   * Check renderer visibility and trigger relevant event if necessary.
   */
  private checkGameObjectVisible(renderer: RendererComponent): boolean {
    const isVisible = this.bounds.intersects(renderer.bounds);

    if (isVisible) {
      if (!renderer.isVisible) {
        renderer.isVisible = true;
        renderer.onBecameVisible();
      }
    } else {
      if (renderer.isVisible) {
        renderer.isVisible = false;
        renderer.onBecameInvisible();
      }
    }

    return isVisible;
  }

}
