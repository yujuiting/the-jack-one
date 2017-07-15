import { Vector } from 'Engine/Math/Vector';
import { Recyclable } from 'Engine/Utility/Pool';
import { CircleBounds } from 'Engine/Physics/CircleBounds';

export class Bounds implements Recyclable {

  public center: Vector = Vector.Get();

  public extents: Vector = Vector.Get();

  public readonly min: Vector = Vector.Get();

  public readonly max: Vector = Vector.Get();

  public readonly size: Vector = Vector.Get();

  private _canRecycle: boolean = false;

  public get canRecycle(): boolean { return this._canRecycle; }

  public containPoint(point: Vector): boolean {
    return point.greaterThan(this.min) &&
           point.lessThan(this.max);
  }

  public intersectWithBounds(bounds: Bounds): boolean {
    if (this.max.lessThan(bounds.min)) {
      return false;
    }

    if (this.min.greaterThan(bounds.max)) {
      return false;
    }

    return true;
  }

  public intersectWithCircle(circle: CircleBounds): boolean {
    const min = this.min.clone();
    min.x -= circle.radius;
    min.y -= circle.radius;

    if (circle.center.lessThan(min)) {
      return false;
    }

    const max = this.max.clone();
    max.x += circle.radius;
    max.y += circle.radius;

    if (circle.center.greaterThan(max)) {
      return false;
    }

    // TODO: handle border radius

    return true;
  }

  public calculate() {
    this.min.copy(this.center);
    this.min.subtract(this.extents);

    this.max.copy(this.center);
    this.max.subtract(this.extents);

    this.size.copy(this.extents);
    this.size.scale(2);
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
