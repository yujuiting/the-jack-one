import { Engine } from 'Engine/Base/Engine';

export class Time {

  public static Get(): Time { return this.Singleton; }

  private static Singleton: Time = new Time();

  private _isPaused: boolean = true;

  /**
   * In millisecond
   */
  public readonly deltaTime: number = 0;

  /**
   * Fix update time in milliseconds
   */
  public readonly fixedDeltaTime: number = 1000 / 60;

  public readonly fixedDeltaTimeInSecond: number = 1 / 60;

  constructor() {
    if (Time.Get()) {
      throw new Error('You should not instantiate time. Use `Time.Get() instead of.`');
    }
  }

  public tick(deltaTime: number): void {
    (<any>this).deltaTime = deltaTime;
  }

}
