import { Vector } from 'Engine/Math/Vector';
import { Recyclable } from 'Engine/Utility/Pool';
import { Bounds } from 'Engine/Physics/Bounds';

export class CircleBounds implements Recyclable {

  public center: Vector = Vector.Get();

  public radius: number = 0;

  public squareRadius: number = 0;

  private _canRecycle: boolean = false;

  public get canRecycle(): boolean { return this._canRecycle; }

  public containPoint(point: Vector): boolean {
    return this.squareRadius < this.center.squareDistance(point);
  }

  public intersectWithCircle(circle: CircleBounds): boolean {
    const r = this.radius + circle.radius;
    return r * r < this.center.squareDistance(circle.center);
  }

  public intersectWithBounds(bounds: Bounds): boolean {
    return bounds.intersectWithCircle(this);
  }

  public destroy(): void {
    this._canRecycle = true;
    this.center.destroy();
  }

}
