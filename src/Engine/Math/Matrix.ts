import { Vector } from 'Engine/Math/Vector';

export class Matrix {

  public static readonly Identity: Matrix = new Matrix();

  /**
   * for handle translation, assume matrix as 3x3
   * but third row is always [0, 0, 1]
   */
  private _value: number[][] = [
    [1, 0, 0],
    [0, 1, 0]
    // [0, 0, 1]
  ];

  private _save: number[][] = [];

  public get [0](): number[] { return this._value[0]; }
  public get [1](): number[] { return this._value[1]; }

  constructor(value?: number[][]) {
    if (value !== void 0) {
      for (let i = 0; i < 2; i++) {
        if (!value[i]) {
          continue;
        }
        for (let j = 0; j < 3; j++) {
          this._value[i][j] = value[i][j] || this._value[i][j];
        }
      }
    }
  }

  public save(): this {
    this._save = [
      [this[0][0], this[0][1], this[0][2]],
      [this[1][0], this[1][1], this[1][2]]
    ];
    return this;
  }

  public restore(): this {
    this._value = [
      [this._save[0][0], this._save[0][1], this._save[0][2]],
      [this._save[1][0], this._save[1][1], this._save[1][2]]
    ];
    return this;
  }

  public reset(): this {
    this._value = [
      [1, 0, 0],
      [0, 1, 0]
    ];
    return this;
  }

  public setRotatation(radian: number): this {
    const rotation = new Matrix([
      [Math.cos(radian), -Math.sin(radian)],
      [Math.sin(radian),  Math.cos(radian)]
    ]);
    return this.multiply(rotation);
  }

  public setTranslation(position: Vector): this;
  public setTranslation(x: number, y: number): this;
  public setTranslation(positionOrX: Vector|number, y?: number): this {
    let translation: Matrix;
    if (positionOrX instanceof Vector) {
      translation = new Matrix([
        [1, 0, positionOrX.x],
        [0, 1, positionOrX.y]
      ]);
    } else if (y !== void 0) {
      translation = new Matrix([
        [1, 0, positionOrX],
        [0, 1, y]
      ]);
    } else {
      return this;
    }

    return this.multiply(translation);
  }

  public setScaling(magnification: Vector): this;
  public setScaling(x: number, y: number): this;
  public setScaling(magnificationOrX: Vector|number, y?: number): this {
    let scaling: Matrix;
    if (magnificationOrX instanceof Vector) {
      scaling = new Matrix([
        [magnificationOrX.x, 0],
        [0, magnificationOrX.y]
      ]);
    } else if (y !== void 0) {
      scaling = new Matrix([
        [magnificationOrX, 0],
        [0, y]
      ]);
    } else {
      return this;
    }

    return this.multiply(scaling);
  }

  public multiply(other: Matrix): this {
    const a1 = this[0][0];
    const b1 = this[0][1];
    const c1 = this[0][2];
    const d1 = this[1][0];
    const e1 = this[1][1];
    const f1 = this[1][2];
    const a2 = other[0][0];
    const b2 = other[0][1];
    const c2 = other[0][2];
    const d2 = other[1][0];
    const e2 = other[1][1];
    const f2 = other[1][2];
    this[0][0] = a1 * a2 + b1 * d2;
    this[0][1] = a1 * b2 + b1 * e2;
    this[0][2] = a1 * c2 + b1 * f2 + c1;
    this[1][0] = d1 * a2 + e1 * d2;
    this[1][1] = d1 * b2 + e1 * e2;
    this[1][2] = d1 * c2 + e1 * f2 + f1;
    return this;
  }

  public multiplyToPoint(point: Vector): this {
    const x = point.x;
    const y = point.y;
    point.setTo(
      this[0][0] * x + this[0][1] * y + this[0][2] * 1,
      this[1][0] * x + this[1][1] * y + this[1][2] * 1
    );
    return this;
  }

  public multiplyToVector(vector: Vector): this {
    const x = vector.x;
    const y = vector.y;
    vector.setTo(
      this[0][0] * x + this[0][1] * y + 0 * 0,
      this[1][0] * x + this[1][1] * y + 0 * 0
    );
    return this;
  }

  public equalTo(another: Matrix): boolean {
    return this[0][0] === another[0][0] &&
           this[0][1] === another[0][1] &&
           this[0][2] === another[0][2] &&
           this[1][0] === another[1][0] &&
           this[1][1] === another[1][1] &&
           this[1][2] === another[1][2];
  }

  public invertFrom(source: Matrix): this {
    /**
     * [ a, b, c ]
     * [ d, e, f ]
     * [ g, h, i ]
     */
    const a_minor = source[1][1] * 1 - source[1][2] * 0;
    const b_minor = source[1][0] * 1 - source[1][2] * 0;
    const c_minor = source[1][0] * 0 - source[1][1] * 0;
    const d_minor = source[0][1] * 1 - source[0][2] * 0;
    const e_minor = source[0][0] * 1 - source[0][2] * 0;
    const f_minor = source[0][0] * 0 - source[0][1] * 0;
    const g_minor = source[0][1] * source[1][2] - source[0][2] * source[1][1];
    const h_minor = source[0][0] * source[1][2] - source[0][2] * source[1][0];
    const i_minor = source[0][0] * source[1][1] - source[0][1] * source[1][0];
    const inverseDeterminant = 1 / (source[0][0] * a_minor - source[0][1] * b_minor + source[0][2] * c_minor);
    this[0][0] = inverseDeterminant * a_minor;
    this[0][1] = inverseDeterminant * -d_minor;
    this[0][2] = inverseDeterminant * g_minor;
    this[1][0] = inverseDeterminant * -b_minor;
    this[1][1] = inverseDeterminant * e_minor;
    this[1][2] = inverseDeterminant * -h_minor;
    return this;
  }

  public getInverse(): Matrix {
    return new Matrix().invertFrom(this);
  }

  public clone(): Matrix {
    return new Matrix(this._value);
  }

  public toString(): string {
    const matrixString = this._value
      .map(row => row.join(','))
      .reduce((prev, curr) => prev += `[${curr}]`, '');

    return `Matrix ${matrixString}`;
  }

}
