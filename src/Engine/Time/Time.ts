export const Time = Symbol('Time');

export interface Time {

  /**
   * In millisecond
   */
  readonly deltaTime: number;

  /**
   * Fix update time in milliseconds
   */
  readonly fixedDeltaTime: number;

  readonly fixedDeltaTimeInSecond: number;

  tick(deltaTime: number): void;

}
