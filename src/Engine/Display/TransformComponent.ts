import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';
import { Vector } from 'Engine/Math/Vector';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';
import { Matrix } from 'Engine/Math/Matrix';

/**
 * Basic transform object
 */
@UniqueComponent()
export class TransformComponent extends Component {

  /**
   * position in world coordinate
   */
  public position: Vector = Vector.Get();

  /**
   * local position, relative to parent.
   */
  public localPosition: Vector = Vector.Get();

  public scale: Vector = Vector.Get();

  /**
   * rotation in world coordinate
   * it is radian
   */
  public rotation: number = 0;

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
    if (this.host.parent) {
      this.position.copy(this.localPosition);
      this.position.add(this.host.parent.transform.position);
    }

    this.toWorldMatrix.reset();
    /**
     * transform order:
     * 1. scale
     * 2. rotate
     * 3. translate
     * 4. optional, check parent
     */
    this.toWorldMatrix.setTranslation(this.position);
    this.toWorldMatrix.setRotatation(this.rotation);
    this.toWorldMatrix.setScaling(this.scale);

    this.toLocalMatrix.invertFrom(this.toWorldMatrix);
  }

  public reset(): void {
    super.reset();
    this.position = Vector.Get();
    this.localPosition = Vector.Get();
    this.scale = Vector.Get(1, 1);
    this.rotation = 0;
  }

  public destroy(): void {
    super.destroy();
    Vector.Put(this.position);
    Vector.Put(this.localPosition);
    Vector.Put(this.scale);
    delete this.position;
    delete this.scale;
  }

}
