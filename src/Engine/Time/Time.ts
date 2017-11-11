export const Time = Symbol('Time');

export interface Time {

  /**
   * In millisecond
   */
  readonly deltaTime: number;

  readonly deltaTimeInSecond: number;

  /**
   * Fix update time in milliseconds
   */
  readonly fixedDeltaTime: number;

  readonly fixedDeltaTimeInSecond: number;

  fixedUpdate(deltaTime: number, alpha: number): void;

  update(frameTime: number): void;

}
