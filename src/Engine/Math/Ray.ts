import { Vector } from 'Engine/Math/Vector';
import { Line } from 'Engine/Math/Line';

export class Ray {

  constructor(public readonly origin: Vector = new Vector(),
              public readonly direction: Vector = new Vector()) {
    this.direction.normalize();
  }

  public getPoint(distance: number): Vector {
    return this.direction.clone().scale(distance).add(this.origin);
  }

  /**
   * Return distance (or times) from this ray to another
   * Return -1 means no intersect
   * @see https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/565282#565282
   * @param another
   */
  public intersect(another: Ray|Line): number {
    const p = this.origin;
    const r = this.direction;
    let q: Vector;
    let s: Vector;
    if (another instanceof Ray) {
      q = another.origin;
      s = another.direction;
    } else {
      q = another.begin;
      s = another.getDirection();
    }

    const pq = q.clone().subtract(p);
    const r_x_s = r.cross(s);
    const pq_x_r = pq.cross(r);

    if (r_x_s === 0) {
      return -1;
    } else {
      const u = pq_x_r / r_x_s;

      // if u less than 0 means ray is going far way, cross at aother side
      if (u >= 0) {
        return pq.cross(s) / r_x_s;
      }
    }

    return -1;
  }

}
