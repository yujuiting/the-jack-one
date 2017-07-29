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

  public anchor: Vector;

  public position: Vector;

  public scale: Vector;

  /**
   * is radian
   */
  public rotation: number;

  public width: number;

  public height: number;

  /**
   * calculate every update
   * if you want a updated value in fixedUpdate, call `calculate` before.
   */
  public readonly toWorldMatrix: Matrix = new Matrix();

  /**
   * inverse matrix of `toWorldMatrix`
   */
  public readonly toLocalMatrix: Matrix = this.toWorldMatrix.getInverse();

  public update(): void {
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
    this.anchor = Vector.Get();
    this.position = Vector.Get();
    this.scale = Vector.Get(1, 1);
    this.width = 0;
    this.height = 0;
    this.toWorldMatrix.reset();
    this.toLocalMatrix.invertFrom(this.toWorldMatrix);
  }

  public destroy(): void {
    super.destroy();
    this.anchor.destroy();
    this.position.destroy();
    this.scale.destroy();
    delete this.anchor;
    delete this.position;
    delete this.scale;
    delete this.width;
    delete this.height;
  }

}
