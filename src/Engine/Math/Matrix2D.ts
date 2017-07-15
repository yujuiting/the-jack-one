import { Vector } from 'Engine/Math/Vector';

export class Matrix2D {

  private _value: number[][] = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];

  public get [0](): number[] { return this._value[0]; }
  public get [1](): number[] { return this._value[1]; }
  public get [2](): number[] { return this._value[2]; }

  constructor(value?: number[][]) {
    if (value !== void 0) {
      for (let i = 0; i < 3; i++) {
        if (!value[i]) {
          continue;
        }
        for (let j = 0; j < 3; j++) {
          this._value[i][j] = value[i][j] || this._value[i][j];
        }
      }
    }
  }

  public setRotatation(radian: number): void {
    const rotation = new Matrix2D([
      [Math.cos(radian), -Math.sin(radian)],
      [Math.sin(radian),  Math.cos(radian)]
    ]);
    this.multiply(rotation);
  }

  public setTranslation(position: Vector): void {
    const translation = new Matrix2D([
      [1, 0, -position.x],
      [0, 1, -position.y]
    ]);
    this.multiply(translation);
  }

  public setScaling(magnification: Vector): void {
    const scaling = new Matrix2D([
      [magnification.x, 0],
      [0, magnification.y]
    ]);
    this.multiply(scaling);
  }

  public multiply(other: Matrix2D): void {
    const a1 = this[0][0];
    const b1 = this[0][1];
    const c1 = this[0][2];
    const d1 = this[1][0];
    const e1 = this[1][1];
    const f1 = this[1][2];
    const g1 = this[2][0];
    const h1 = this[2][1];
    const i1 = this[2][2];
    const a2 = other[0][0];
    const b2 = other[0][1];
    const c2 = other[0][2];
    const d2 = other[1][0];
    const e2 = other[1][1];
    const f2 = other[1][2];
    const g2 = other[2][0];
    const h2 = other[2][1];
    const i2 = other[2][2];
    this[0][0] = a1 * a2 + b1 * d2 + c1 * g2;
    this[0][1] = a1 * b2 + b1 * e2 + c1 * h2;
    this[0][2] = a1 * c2 + b1 * f2 + c1 * i2;
    this[1][0] = d1 * a2 + e1 * d2 + f1 * g2;
    this[1][1] = d1 * b2 + e1 * e2 + f1 * h2;
    this[1][2] = d1 * c2 + e1 * f2 + f1 * i2;
    this[2][0] = g1 * a2 + h1 * d2 + i1 * g2;
    this[2][1] = g1 * b2 + h1 * e2 + i1 * h2;
    this[2][2] = g1 * c2 + h1 * f2 + i1 * i2;
  }

  public multiplyToPoint(point: Vector): void {
    const x = point.x;
    const y = point.y;
    point.setTo(
      this[0][0] * x + this[0][1] * y + this[0][2] * 1,
      this[1][0] * x + this[1][1] * y + this[1][2] * 1,
      this[2][0] * x + this[2][1] * y + this[2][2] * 1
    );
  }

  public multiplyToVector(vector: Vector): void {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    vector.setTo(
      this[0][0] * x + this[0][1] * y + 0 * z,
      this[1][0] * x + this[1][1] * y + 0 * z,
      this[2][0] * x + this[2][1] * y + 1 * z
    );
  }

  public clone(): Matrix2D {
    return new Matrix2D(this._value);
  }

  public toString(): string {
    const matrixString = this._value
      .map(row => row.join(','))
      .reduce((prev, curr) => prev += `[${curr}]`, '');

    return `Matrix ${matrixString}`;
  }

}
