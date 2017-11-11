import { Service } from 'Engine/Decorator/Service';
import { Time } from 'Engine/Time/Time';

@Service(Time)
export class TimeImplement implements Time {

  /**
   * In millisecond
   */
  private _deltaTime = 0;

  private _deltaTimeInSecond = 0;

  /**
   * Fix update time in milliseconds
   */
  private _fixedDeltaTime = 1000 / 60;

  private _fixedDeltaTimeInSecond = 1 / 60;

  public get deltaTime(): number { return this._deltaTime; }

  public get deltaTimeInSecond(): number { return this._deltaTimeInSecond; }

  public get fixedDeltaTime(): number { return this._fixedDeltaTime; }

  public get fixedDeltaTimeInSecond(): number { return this._fixedDeltaTimeInSecond; }

  public fixedUpdate(deltaTime: number, alpha: number): void {
    this._fixedDeltaTime = deltaTime * alpha;
    this._fixedDeltaTimeInSecond = this._fixedDeltaTime * 0.001;
  }

  public update(frameTime: number): void {
    this._deltaTime = frameTime;
    this._deltaTimeInSecond = frameTime * 0.001;
  }

}
