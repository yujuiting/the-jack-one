import { Component } from 'Engine/Core/Component';
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
  private _position: Vector = Vector.Get();

  /**
   * Local position, relative to parent.
   */
  private _localPosition: Vector = Vector.Get();

  /**
   * Scale in world space.
   */
  private _scale: Vector = Vector.Get(1, 1);

  private _localScale: Vector = Vector.Get(1, 1);

  /**
   * Rotation in world space.
   */
  public rotation: number = 0;

  public localRotation: number = 0;

  /**
   * calculate every fixed update
   */
  private _toWorldMatrix: Matrix = Matrix.Get();

  /**
   * inverse matrix of `toWorldMatrix`
   */
  private _toLocalMatrix: Matrix = Matrix.Get();

  public get position(): Vector { return this._position; }

  public get localPosition(): Vector { return this._localPosition; }

  public get scale(): Vector { return this._scale; }

  public get localScale(): Vector { return this._localScale; }

  public get toWorldMatrix(): Matrix { return this._toWorldMatrix; }

  public get toLocalMatrix(): Matrix { return this._toLocalMatrix; }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);

    if (this.host.parent) {
      const parentTransform = this.host.parent.transform;
      this._position.copy(parentTransform._position);
      this._position.add(this._localPosition);
      this._scale.copy(parentTransform._scale);
      this._scale.multiply(this._localScale);
      this.rotation = parentTransform.rotation + this.localRotation;
    }

    this._toWorldMatrix.reset();
    /**
     * transform order:
     * 1. scale
     * 2. rotate
     * 3. translate
     * 4. optional, check parent
     */
    this._toWorldMatrix.translate(this._position);
    this._toWorldMatrix.rotate(this.rotation);
    this._toWorldMatrix.scale(this._scale);

    this._toLocalMatrix.invertFrom(this._toWorldMatrix);
  }

  public reset(): void {
    super.reset();
    this._position = Vector.Get();
    this._localPosition = Vector.Get();
    this._scale = Vector.Get(1, 1);
    this._localScale = Vector.Get(1, 1);
    this.rotation = 0;
    this._toWorldMatrix = Matrix.Get();
    this._toLocalMatrix = Matrix.Get();
  }

  public destroy(): void {
    super.destroy();
    Vector.Put(this._position);
    Vector.Put(this._localPosition);
    Vector.Put(this._scale);
    Vector.Put(this._localScale);
    Matrix.Put(this._toWorldMatrix);
    Matrix.Put(this._toLocalMatrix);
    delete this._position;
    delete this._localPosition;
    delete this._scale;
    delete this._localScale;
    delete this._toWorldMatrix;
    delete this._toLocalMatrix;
  }

}
