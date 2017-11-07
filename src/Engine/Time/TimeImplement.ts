import { Service } from 'Engine/Decorator/Service';
import { Time } from 'Engine/Time/Time';

interface InternalTime extends Time {
  deltaTime: number;
  fixedDeltaTime: number;
}

@Service(Time)
export class TimeImplement implements Time {

  /**
   * In millisecond
   */
  public readonly deltaTime: number = 0;

  /**
   * Fix update time in milliseconds
   */
  public readonly fixedDeltaTime: number = 1000 / 60;

  public readonly fixedDeltaTimeInSecond: number = 1 / 60;

  public tick(deltaTime: number): void {
    (<InternalTime>this).deltaTime = deltaTime;
  }

}
