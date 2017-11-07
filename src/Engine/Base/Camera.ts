import { GameObject } from 'Engine/Base/GameObject';
import { Screen } from 'Engine/Base/Screen';
import { GameObjectInitializer } from 'Engine/Base/GameObjectInitializer';
import { Color } from 'Engine/Display/Color';
import { Bounds } from 'Engine/Display/Bounds';
import { Vector } from 'Engine/Math/Vector';
import { Rect } from 'Engine/Math/Rect';
import { Matrix } from 'Engine/Math/Matrix';
import { Layer, AllBuiltInLayer } from 'Engine/Utility/Type';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
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

  constructor(browser: BrowserDelegate,
              screen: Screen,
              gameObjectInitializer: GameObjectInitializer) {
    super(gameObjectInitializer);
    this.setSize(screen.width, screen.height);
  }

  public setSize(width: number, height: number): void {
    this.toScreenMatrix.reset();

    this.rect.width = width;
    this.rect.height = height;

    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;

    // set center as zero point.
    this.toScreenMatrix.setTranslation(halfWidth, halfHeight);
    // reverse Y axis
    this.toScreenMatrix.setScaling(0, -1);

    this.bounds.extents.setTo(halfWidth, halfHeight);
  }

  public update(): void {
    super.update();
    /**
     * Perform camera movement, rotation and scaling.
     * Save those transform and restore after render.
     */
    this.toScreenMatrix.save();
    this.toScreenMatrix.setTranslation(-this.transform.position.x, -this.transform.position.y);
    this.toScreenMatrix.setRotatation(this.transform.rotation);
    this.toScreenMatrix.setScaling(this.transform.scale);

    this.toWorldMatrix.invertFrom(this.toScreenMatrix);

    this.bounds.center.copy(this.transform.position);
  }

  public postRender(): void {
    super.postRender();
    this.toScreenMatrix.restore();
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
