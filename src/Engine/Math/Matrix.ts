import { Vector } from 'Engine/Math/Vector';
import { Recyclable, Pool } from 'Engine/Utility/Pool';

export interface MatrixLike {
  [0]: [number, number, number];
  [1]: [number, number, number];
}

export class Matrix implements MatrixLike, Recyclable {

  private static pool: Pool<Matrix> = new Pool((value?: MatrixLike) => new Matrix(value), Infinity, 64);

  public static Get(value?: MatrixLike): Matrix {
    // matrix pool did not have limit
    return (<Matrix>this.pool.get(value));
  }

  public static Put(matrix: Matrix): void { this.pool.put(matrix); }

  public static readonly Identity: Matrix = new Matrix();

  /**
   * [m11, m12, dx]
   * [m21, m22m dy]
   */
  private _value: MatrixLike = [
    [1, 0, 0],
    [0, 1, 0]
  ];

  private _save: MatrixLike[] = [];

  public get [0](): [number, number, number] { return this._value[0]; }
  public get [1](): [number, number, number] { return this._value[1]; }

  private _canRecycle = false;

  public get canRecycle(): boolean { return this._canRecycle; }

  constructor(value?: MatrixLike) {
    if (value !== void 0) {
      this._value[0][0] = value[0][0];
      this._value[0][1] = value[0][1];
      this._value[0][2] = value[0][2];
      this._value[1][0] = value[1][0];
      this._value[1][1] = value[1][1];
      this._value[1][2] = value[1][2];
    }
    this.save();
  }

  /**
   * Save current state, it can be restore later.
   */
  public save(): this {
    this._save.push([
      [this[0][0], this[0][1], this[0][2]],
      [this[1][0], this[1][1], this[1][2]]
    ]);
    return this;
  }

  public restore(): this {
    const last = this._save.pop();
    if (last) {
      this._value = last;
    } else {
      this.reset();
    }
    return this;
  }

  /**
   * Reset matrix to identity, and also clear saved states.
   */
  public reset(value?: MatrixLike): this {
    this._save = [];
    if (value !== void 0) {
      this._value[0][0] = value[0][0];
      this._value[0][1] = value[0][1];
      this._value[0][2] = value[0][2];
      this._value[1][0] = value[1][0];
      this._value[1][1] = value[1][1];
      this._value[1][2] = value[1][2];
    } else {
      this._value = [
        [1, 0, 0],
        [0, 1, 0]
      ];
    }
    return this;
  }

  public setRotatation(radian: number): this {
    /**
     * TODO: m11, m22 has default value 1, that should be a bug?
     */
    const cos = Math.cos(radian) || 1;
    const sin = Math.sin(radian);
    return this.multiply([
      [cos, -sin, 0],
      [sin,  cos, 0]
    ]);
  }

  public setTranslation(position: Vector): this;
  public setTranslation(x: number, y: number): this;
  public setTranslation(positionOrX: Vector|number, y?: number): this {
    if (positionOrX instanceof Vector) {
      return this.multiply([
        [1, 0, positionOrX.x],
        [0, 1, positionOrX.y]
      ]);
    } else if (y !== void 0) {
      return this.multiply([
        [1, 0, positionOrX],
        [0, 1, y]
      ]);
    }
    return this;
  }

  public setScaling(magnification: Vector): this;
  public setScaling(x: number, y: number): this;
  public setScaling(magnificationOrX: Vector|number, y?: number): this {
    /**
     * TODO: m11, m22 has default value 1, that should be a bug?
     */
    if (magnificationOrX instanceof Vector) {
      return this.multiply([
        [magnificationOrX.x || 1, 0, 0],
        [0, magnificationOrX.y || 1, 0]
      ]);
    } else if (y !== void 0) {
      return this.multiply([
        [magnificationOrX || 1, 0, 0],
        [0, y || 1, 0]
      ]);
    }
    return this;
  }

  public multiply(other: MatrixLike): this {
    const a1 = this._value[0][0];
    const b1 = this._value[0][1];
    const c1 = this._value[0][2];
    const d1 = this._value[1][0];
    const e1 = this._value[1][1];
    const f1 = this._value[1][2];
    const a2 = other[0][0];
    const b2 = other[0][1];
    const c2 = other[0][2];
    const d2 = other[1][0];
    const e2 = other[1][1];
    const f2 = other[1][2];
    this._value[0][0] = a1 * a2 + b1 * d2;
    this._value[0][1] = a1 * b2 + b1 * e2;
    this._value[0][2] = a1 * c2 + b1 * f2 + c1;
    this._value[1][0] = d1 * a2 + e1 * d2;
    this._value[1][1] = d1 * b2 + e1 * e2;
    this._value[1][2] = d1 * c2 + e1 * f2 + f1;
    return this;
  }

  public multiplyToPoint(point: Vector): this {
    const x = point.x;
    const y = point.y;
    point.reset(
      this._value[0][0] * x + this._value[0][1] * y + this._value[0][2] * 1,
      this._value[1][0] * x + this._value[1][1] * y + this._value[1][2] * 1
    );
    return this;
  }

  /**
   * Mutiply rotatation and scaling but not translation
   * @param vector
   */
  public multiplyToVector(vector: Vector): this {
    const x = vector.x;
    const y = vector.y;
    vector.reset(
      this._value[0][0] * x + this._value[0][1] * y + 0 * 0,
      this._value[1][0] * x + this._value[1][1] * y + 0 * 0
    );
    return this;
  }

  public equalTo(another: MatrixLike): boolean {
    return this._value[0][0] === another[0][0] &&
           this._value[0][1] === another[0][1] &&
           this._value[0][2] === another[0][2] &&
           this._value[1][0] === another[1][0] &&
           this._value[1][1] === another[1][1] &&
           this._value[1][2] === another[1][2];
  }

  public invertFrom(source: MatrixLike): this {
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
    // const f_minor = source[0][0] * 0 - source[0][1] * 0;
    const g_minor = source[0][1] * source[1][2] - source[0][2] * source[1][1];
    const h_minor = source[0][0] * source[1][2] - source[0][2] * source[1][0];
    // const i_minor = source[0][0] * source[1][1] - source[0][1] * source[1][0];
    const inverseDeterminant = 1 / (source[0][0] * a_minor - source[0][1] * b_minor + source[0][2] * c_minor);
    this._value[0][0] = inverseDeterminant * a_minor;
    this._value[0][1] = inverseDeterminant * -d_minor;
    this._value[0][2] = inverseDeterminant * g_minor;
    this._value[1][0] = inverseDeterminant * -b_minor;
    this._value[1][1] = inverseDeterminant * e_minor;
    this._value[1][2] = inverseDeterminant * -h_minor;
    return this;
  }

  public getInverse(): Matrix {
    return new Matrix().invertFrom(this);
  }

  public clone(): Matrix {
    return new Matrix(this._value);
  }

  public destroy(): void {
    this._canRecycle = true;
  }

  public toString(): string {
    const matrixString = `[${this[0]}][${this[1]}]`;
    return `Matrix ${matrixString}`;
  }

}
