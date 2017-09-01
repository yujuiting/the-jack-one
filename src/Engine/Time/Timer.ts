import { GameObject } from 'Engine/Base/GameObject';
import { Time } from 'Engine/Time/Time';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Inject } from 'Engine/Decorator/Inject';
import { Class } from 'Engine/Decorator/Class';
import { GameObjectInitializer } from 'Engine/Base/GameObjectInitializer';

interface InternalTimer {
  timestamp: number;
}

/**
 * Timer
 */
@Class()
export class Timer extends GameObject {

  public readonly timestamp: number = 0;

  public interval: number = 1000;

  private accumulation: number = 0;

  private timeEvent: Subject<number> = new Subject<number>();

  constructor(private time: Time,
              gameObjectInitializer: GameObjectInitializer) {
    super(gameObjectInitializer);
    this.pause();
  }

  public get timeEvent$(): Observable<number> {
    return this.timeEvent.asObservable();
  }

  public pause(): void {
    this.deactivate();
  }

  public resume(): void {
    this.activate();
  }

  public update(): void {
    (<InternalTimer>this).timestamp += this.time.deltaTime;
    this.accumulation += this.time.deltaTime;

    if (this.accumulation >= this.interval) {
      this.accumulation -= this.interval;
      this.timeEvent.next(this.timestamp - this.accumulation);
    }
  }

  public reset(): void {
    (<InternalTimer>this).timestamp = 0;
    this.accumulation = 0;

    /**
     * If timer has destroyed, create new timeEvent
     */
    if (this.isDestroyed) {
      this.timeEvent = new Subject<number>();
    }
  }

  public destroy(): void {
    super.destroy();
    this.timeEvent.complete();
  }

}
