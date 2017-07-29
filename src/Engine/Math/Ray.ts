import { Vector } from 'Engine/Math/Vector';

export class Ray {

  constructor(public readonly origin: Vector = new Vector(),
              public readonly direction: Vector = new Vector()) {
    this.direction.normalize();
  }

  public getPoint(distance: number): Vector {
    return this.direction.clone().scale(distance).add(this.origin);
  }

}
