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
   * Aware, collinear will return nothing.
   * @see https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/565282#565282
   * @param another
   */
  public intersect(another: Ray|Line): Vector|undefined {
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
      return;
    } else {
      // const pq_x_s = pq.cross(s);
      // const t = pq_x_s / r_x_s;
      const u = pq_x_r / r_x_s;

      // console.log(`
      // p: ${p}
      // r: ${r}
      // q: ${q}
      // s: ${s}
      // r_x_s: ${r_x_s}
      // pq_x_s: ${pq_x_s}
      // pq_x_r: ${pq_x_r}
      // t: ${t}
      // u: ${u}

      // p1: ${p.clone().add(r.clone().scale(t))}
      // p2: ${q.clone().add(s.clone().scale(u))}
      // `);

      // if u less than 0 means ray is going far way, cross at aother side
      if (u >= 0) {
        return q.clone().add(s.clone().scale(u));
      }
    }

    return;
  }

}
