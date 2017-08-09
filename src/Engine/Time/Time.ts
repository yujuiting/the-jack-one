import { Engine } from 'Engine/Base/Engine';
import { Service } from 'Engine/Decorator/Service';

interface InternalTime extends Time {
  deltaTime: number;
  fixedDeltaTime: number;
}

@Service()
export class Time {

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

  public tick(deltaTime: number): void {
    (<InternalTime>this).deltaTime = deltaTime;
  }

}
