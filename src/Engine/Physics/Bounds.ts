import { Recyclable } from 'Engine/Utility/Pool';
import { Vector } from 'Engine/Math/Vector';

export class Bounds implements Recyclable {

  /**
   * world position
   */
  public center: Vector = Vector.Get();

  public extents: Vector = Vector.Get();

  private _canRecycle: boolean = false;

  constructor();
  constructor(center: Vector, extents: Vector);
  constructor(minX: number, minY: number, maxX: number, maxY: number);
  constructor(...args: any[]) {
    if (args.length === 2) {
      this.center.copy(args[0]);
      this.extents.copy(args[1]);
    } else if (args.length === 4) {
      this.center.setTo(
        (args[2] + args[0]) / 2,
        (args[3] + args[1]) / 2
      );
      this.extents.setTo(
        (args[2] - args[0]) / 2,
        (args[3] - args[1]) / 2
      );
    }
  }

  public get canRecycle(): boolean { return this._canRecycle; }

  /**
   * min point in world coordinate
   */
  public get min(): Vector {
    return this.center.clone().subtract(this.extents);
  }

  /**
   * max point in world coordinate
   */
  public get max(): Vector {
    return this.center.clone().add(this.extents);
  }

  public get size(): Vector {
    return this.extents.clone().scale(2);
  }

  public get top(): number { return this.center.y + this.extents.y; }

  public get bottom(): number { return this.center.y - this.extents.y; }

  public get right(): number { return this.center.x + this.extents.x; }

  public get left(): number { return this.center.x - this.extents.x; }

  public containPoint(point: Vector): boolean {
    return point.greaterThanEqual(this.min) && point.lessThanEqual(this.max);
  }

  public intersects(bounds: Bounds): boolean {
    const minA = this.min;
    const maxA = this.max;
    const minB = bounds.min;
    const maxB = bounds.max;

    if (maxA.x < minB.x || minA.x > maxB.x) {
      return false;
    }

    if (maxA.y < minB.y || minA.y > maxB.y) {
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
