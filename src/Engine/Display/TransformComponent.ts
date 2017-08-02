import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';
import { Vector } from 'Engine/Math/Vector';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';
import { Matrix } from 'Engine/Math/Matrix';

/**
 * Basic transform object
 */
@UniqueComponent()
export class TransformComponent extends Component {

  /**
   * position in world coordinate
   */
  public position: Vector;

  public scale: Vector;

  /**
   * rotation in world coordinate
   * it is radian
   */
  public rotation: number;

  /**
   * calculate every fixed update
   */
  public readonly toWorldMatrix: Matrix = new Matrix();

  /**
   * inverse matrix of `toWorldMatrix`
   */
  public readonly toLocalMatrix: Matrix = this.toWorldMatrix.getInverse();

  public fixedUpdate(): void {
    this.calculate();
  }

  public calculate(): void {
    this.toWorldMatrix.reset();
    /**
     * transform order:
     * 1. scale
     * 2. rotate
     * 3. translate
     */
    this.toWorldMatrix.setTranslation(this.position);
    this.toWorldMatrix.setRotatation(this.rotation);
    this.toWorldMatrix.setScaling(this.scale);

    this.toLocalMatrix.invertFrom(this.toWorldMatrix);
  }

  public reset(): void {
    super.reset();
    this.position = Vector.Get();
    this.scale = Vector.Get(1, 1);
    this.rotation = 0;
  }

  public destroy(): void {
    super.destroy();
    Vector.Put(this.position);
    Vector.Put(this.scale);
    delete this.position;
    delete this.scale;
  }

}
