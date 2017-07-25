import { GameObject } from 'Engine/Base/GameObject';
import { Time } from 'Engine/Time/Time';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Inject } from 'Engine/Utility/Decorator/Inject';

/**
 * Timer
 */
export class Timer extends GameObject {

  private timestamp: number = 0;

  private accumulation: number = 0;

  private timeEvent: Subject<number> = new Subject<number>();

  @Inject(Time)
  private time: Time;

  public get timeEvent$(): Observable<number> {
    return this.timeEvent.asObservable();
  }

  constructor(public interval: number = 1000, pauseOnCreated: boolean = true) {
    super();

    if (pauseOnCreated) {
      this.pause();
    }
  }

  public pause(): void {
    this.deactivate();
  }

  public resume(): void {
    this.activate();
  }

  public update(): void {
    this.timestamp += this.time.deltaTime;

    if (this.accumulation < this.interval) {
      this.accumulation += this.time.deltaTime;
    } else {
      this.accumulation -= this.interval;
      this.timeEvent.next(this.timestamp - this.accumulation);
    }
  }

  public reset(): void {
    this.timestamp = 0;
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
