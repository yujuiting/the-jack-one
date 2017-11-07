import { Recyclable, Pool } from 'Engine/Utility/Pool';

/**
 * Vector
 */
export class Vector implements Recyclable {

  public static readonly Zero: Vector = new Vector();

  public static readonly Right: Vector = new Vector(1, 0);

  public static readonly Left: Vector = new Vector(-1, 0);

  public static readonly Up: Vector = new Vector(0, 1);

  public static readonly Down: Vector = new Vector(0, -1);

  public static Cross(v1: Vector, v2: Vector): number;
  public static Cross(v1: Vector, v2: number): Vector;
  public static Cross(v1: number, v2: Vector): Vector;
  public static Cross(v1: Vector|number, v2: Vector|number): Vector|number|undefined {
    if (v1 instanceof Vector) {
      if (v2 instanceof Vector) {
        return new Vector().copy(v1).cross(v2);
      } else {
        return new Vector().copy(v1).cross(v2);
      }
    } else {
      if (v2 instanceof Vector) {
        // return Vec2( -s * a.y, s * a.x );
        return new Vector(-v1 * v2.y, v1 * v2.x);
      }
    }
    return;
  }

  private static pool: Pool<Vector> = new Pool(Vector);

  public static Get(x: number = 0, y: number = 0): Vector {
    // vector pool did not have limit
    return (<Vector>this.pool.get()).setTo(x, y);
  }

  public static Put(vector: Vector): void { this.pool.put(vector); }

  private _canRecycle: boolean = false;

  public get canRecycle(): boolean { return this._canRecycle; }

  public get isZero(): boolean {
    return Math.abs(this.x) < 1e-6 &&
           Math.abs(this.y) < 1e-6;
  }

  constructor(public x: number = 0,
              public y: number = 0) {}

  public setTo(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  public add(other: Vector): this;
  public add(x: number, y?: number): this;
  public add(otherOrX: Vector|number, y?: number): this {
    if (otherOrX instanceof Vector) {
      this.x += otherOrX.x;
      this.y += otherOrX.y;
    } else {
      this.x += otherOrX;
      this.y += y || otherOrX;
    }
    return this;
  }

  public subtract(other: Vector): this;
  public subtract(x: number, y?: number): this;
  public subtract(otherOrX: Vector|number, y?: number): this {
    if (otherOrX instanceof Vector) {
      this.x -= otherOrX.x;
      this.y -= otherOrX.y;
    } else {
      this.x -= otherOrX;
      this.y -= y || otherOrX;
    }
    return this;
  }

  public multiply(other: Vector): this;
  public multiply(x: number, y?: number): this;
  public multiply(otherOrX: Vector|number, y?: number): this {
    if (otherOrX instanceof Vector) {
      this.x *= otherOrX.x;
      this.y *= otherOrX.y;
    } else {
      this.x *= otherOrX;
      this.y *= y || otherOrX;
    }
    return this;
  }

  public dot(other: Vector): number {
    return this.x * other.x
         + this.y * other.y;
  }

  public cross(value: number): Vector;
  public cross(value: Vector): number;
  public cross(value: Vector|number): Vector|number {
    if (value instanceof Vector) {
      return this.x * value.y - this.y * value.x;
    } else {
      return new Vector(this.y * value, -this.x * value);
    }
  }

  public magnitude(): number {
    return Math.sqrt(this.squareMagnitude());
  }

  public squareMagnitude(): number {
    return Math.pow(this.x, 2)
         + Math.pow(this.y, 2);
  }

  public distanceTo(other: Vector): number {
    return Math.sqrt(this.squareDistance(other));
  }

  public squareDistance(other: Vector): number {
    return  Math.pow(this.x - other.x, 2)
          + Math.pow(this.y - other.y, 2);
  }

  public normalize(): this {
    const magnitude = this.magnitude();
    return magnitude > 0 ? this.multiply(1 / magnitude) : this.setTo(0, 0);
  }

  /**
   * Get normal vector that is rotate 90 degree clockwise.
   */
  public normal(): Vector {
    const normal = new Vector(this.y, -this.x);
    normal.normalize();
    return normal;
  }

  public translate(vector: Vector): this {
    return this.subtract(vector);
  }

  public reset(): this {
    return this.setTo(0, 0);
  }

  public rotate(radian: number): this {
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);
    const x = cos * this.x - sin * this.y;
    const y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  }

  public equalTo(other: Vector): boolean {
    return this.x === other.x
        && this.y === other.y;
  }

  public greaterThan(other: Vector): boolean {
    return this.x > other.x
        && this.y > other.y;
  }

  public greaterThanEqual(other: Vector): boolean {
    return this.x >= other.x
        && this.y >= other.y;
  }

  public lessThan(other: Vector): boolean {
    return this.x < other.x
        && this.y < other.y;
  }

  public lessThanEqual(other: Vector): boolean {
    return this.x <= other.x
        && this.y <= other.y;
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public copy(other: Vector): this {
    return this.setTo(other.x, other.y);
  }

  public destroy(): void {
    this._canRecycle = true;
  }

  public toString(): string {
    return `Vector (${this.x},${this.y})`;
  }

}
