import { Recyclable } from 'Engine/Utility/Pool';
import { Vector } from 'Engine/Math/Vector';

export class Bounds implements Recyclable {

  /**
   * position relative to body position.
   */
  public center: Vector = Vector.Get();

  public extents: Vector = Vector.Get();

  private _canRecycle: boolean = false;

  public get canRecycle(): boolean { return this._canRecycle; }

  public get min(): Vector {
    return this.center.clone().subtract(this.extents);
  }

  public get max(): Vector {
    return this.center.clone().add(this.extents);
  }

  public get size(): Vector {
    return this.extents.clone().scale(2);
  }

  public containPoint(point: Vector): boolean {
    return point.greaterThan(this.min) && point.lessThan(this.max);
  }

  public intersects(bounds: Bounds): boolean {
    if (this.max.lessThan(bounds.min)) {
      return false;
    }

    if (this.min.greaterThan(bounds.max)) {
      return false;
    }

    return true;
  }

  public destroy(): void {
    this._canRecycle = true;
    this.center.destroy();
    this.extents.destroy();
    this.min.destroy();
    this.max.destroy();
    this.size.destroy();
  }

}
