import { Recyclable, Pool } from 'Engine/Utility/Pool';

/**
 * Vector
 */
export class Vector implements Recyclable {

  private static pool: Pool<Vector> = new Pool(Vector);

  public static Get(x: number = 0, y: number = 0, z: number = 0): Vector {
    const vector = (<Vector>this.pool.get());
    vector.setTo(x, y, z);

    return vector;
  }

  public static Put(vector: Vector): void { this.pool.put(vector); }

  private _canRecycle: boolean = false;

  public get canRecycle(): boolean { return this._canRecycle; }

  public get isZero(): boolean {
    return Math.abs(this.x) < 0e6 &&
           Math.abs(this.y) < 0e6 &&
           Math.abs(this.y) < 0e6;
  }

  constructor(public x: number = 0,
              public y: number = 0,
              public z: number = 0) {}

  public setTo(x: number, y: number, z: number = 0): void {
    this.x = x;
    this.y = y;
    // this.z = z;
  }

  public add(other: Vector): void {
    this.x += other.x;
    this.y += other.y;
    // this.z += other.z;
  }

  public subtract(other: Vector): void {
    this.x -= other.x;
    this.y -= other.y;
    // this.z -= other.z;
  }

  public scale(value: number): void {
    this.x *= value;
    this.y *= value;
    // this.z *= value;
  }

  public dot(other: Vector): number {
    return this.x * other.x
         + this.y * other.y;
        //  + this.z * other.z;
  }

  public cross(other: Vector): Vector {
    return Vector.Get(
      this.y * other.z - this.z * other.y
    , this.z * other.x - this.x * other.z
  //, this.x * other.y - this.y * other.x
    );
  }

  public magnitude(): number {
    return Math.sqrt(this.squareMagnitude());
  }

  public squareMagnitude(): number {
    return Math.pow(this.x, 2)
         + Math.pow(this.y, 2);
      // + Math.pow(this.z, 2);
  }

  public distanceTo(other: Vector): number {
    return Math.sqrt(this.squareDistance(other));
  }

  public squareDistance(other: Vector): number {
    return  Math.pow(this.x - other.x, 2)
          + Math.pow(this.y - other.y, 2);
        //+ Math.pow(this.z - other.z, 2);
  }

  public normalize(): void {
    this.scale(1 / this.magnitude());
  }

  public translate(vector: Vector): void {
    this.subtract(vector);
  }

  public reset(): void {
    this.setTo(0, 0, 0);
  }

  public equalTo(other: Vector): boolean {
    return this.x === other.x
        && this.y === other.y;
        // && this.z === other.z;
  }

  public greaterThan(other: Vector): boolean {
    return this.x > other.x
        && this.y > other.y;
        // && this.z > other.z;
  }

  public lessThan(other: Vector): boolean {
    return this.x < other.x
        && this.y < other.y;
        // && this.z < other.z;
  }

  public clone(): Vector {
    return Vector.Get(this.x, this.y, this.z);
  }

  public copy(other: Vector): void {
    this.setTo(other.x, other.y, other.z);
  }

  public destroy(): void {
    this._canRecycle = true;
  }

  public toString(): string {
    return `Vector (${this.x},${this.y},${this.z})`;
  }

}
