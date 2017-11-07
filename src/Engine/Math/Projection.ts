import { Recyclable } from 'Engine/Utility/Pool';

export class Projection implements Recyclable {

  private _canRecycle: boolean = false;

  get canRecycle(): boolean { return this._canRecycle; }

  constructor(public min: number,
              public max: number) {}

  public overlaps(another: Projection): boolean {
    return this.max > another.min && this.min < another.max;
  }

  public getOverlap(another: Projection): number {
    if (!this.overlaps(another)) {
      return 0;
    }

    return this.max > another.max ? another.max - this.min : this.max - another.min;
  }

  public destroy(): void {
    this._canRecycle = true;
  }

  public toString(): string {
    return `Projection (${this.min}, ${this.max})`;
  }

}
