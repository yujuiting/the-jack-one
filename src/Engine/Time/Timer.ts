import { GameObject } from 'Engine/Core/GameObject';
import { Time } from 'Engine/Time/Time';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Class } from 'Engine/Decorator/Class';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';
import { Inject } from 'Engine/Decorator/Inject';

/**
 * Timer
 */
@Class()
export class Timer extends GameObject {

  private _timestamp: number;

  public interval: number;

  private accumulation: number;

  private timeEvent: Subject<number>;

  public get timestamp(): number { return this._timestamp; }

  public get timeEvent$(): Observable<number> { return this.timeEvent.asObservable(); }

  constructor(@Inject(Time) private time: Time,
              @Inject(GameObjectInitializer) gameObjectInitializer: GameObjectInitializer) {
    super(gameObjectInitializer);
  }

  public reset(): void {
    super.reset();
    this._timestamp = 0;
    this.interval = 1000;
    this.accumulation = 0;
    this.timeEvent = new Subject<number>();
  }

  public destroy(): void {
    super.destroy();
    this.timeEvent.complete();
  }

  public pause(): void {
    this.deactivate();
  }

  public resume(): void {
    this.activate();
  }

  public update(): void {
    this._timestamp += this.time.deltaTime;
    this.accumulation += this.time.deltaTime;

    if (this.accumulation >= this.interval) {
      this.accumulation -= this.interval;
      this.timeEvent.next(this._timestamp - this.accumulation);
    }
  }

}
