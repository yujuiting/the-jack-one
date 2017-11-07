import { Component } from 'Engine/Base/Component';
import { Vector } from 'Engine/Math/Vector';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';
import { Matrix } from 'Engine/Math/Matrix';

/**
 * Basic transform object
 */
@UniqueComponent()
export class TransformComponent extends Component {

  /**
   * Position in world space.
   */
  public position: Vector = Vector.Get();

  /**
   * Local position, relative to parent.
   */
  public localPosition: Vector = Vector.Get();

  /**
   * Scale in world space.
   */
  public scale: Vector = Vector.Get(1, 1);

  public localScale: Vector = Vector.Get(1, 1);

  /**
   * Rotation in world space.
   */
  public rotation: number = 0;

  public localRotation: number = 0;

  /**
   * calculate every fixed update
   */
  public readonly toWorldMatrix: Matrix = new Matrix();

  /**
   * inverse matrix of `toWorldMatrix`
   */
  public readonly toLocalMatrix: Matrix = this.toWorldMatrix.getInverse();

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);

    if (this.host.parent) {
      const parentTransform = this.host.parent.transform;
      this.position.copy(parentTransform.position);
      this.position.add(this.localPosition);
      this.scale.copy(parentTransform.scale);
      this.scale.multiply(this.localScale);
      this.rotation = parentTransform.rotation + this.localRotation;
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
    this.position.reset();
    this.localPosition.reset();
    this.scale.setTo(1, 1);
    this.localScale.setTo(1, 1);
    this.rotation = 0;
  }

  public destroy(): void {
    super.destroy();
    Vector.Put(this.position);
    Vector.Put(this.localPosition);
    Vector.Put(this.scale);
    Vector.Put(this.localScale);
    delete this.position;
    delete this.scale;
    delete this.localScale;
  }

}
