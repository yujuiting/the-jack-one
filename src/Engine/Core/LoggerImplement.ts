import { Service } from 'Engine/Decorator/Service';
import { Logger, LogInfo } from 'Engine/Core/Logger';
import { Color } from 'Engine/Display/Color';
import { Inject } from 'Engine/Decorator/Inject';
import { Time } from 'Engine/Time/Time';
import { Screen } from 'Engine/Display/Screen';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Vector } from 'Engine/Math/Vector';

interface ExLogInfo extends LogInfo {
  lifeTime: number;
}

@Service(Logger)
export class LoggerImplement implements Logger {

  private _logs: ExLogInfo[] = [];

  public defaultColor: Color = Color.White;

  public fontSize = 12;

  get logs(): ReadonlyArray<LogInfo> { return this._logs; }

  constructor(@Inject(Time) private time: Time) {
  }

  public log(message: string, color = this.defaultColor): void {
    const log: ExLogInfo = { message, color, lifeTime: 10000 };
    this._logs.push(log);
  }

  public update(): void {
    const deltaTime = this.time.deltaTime;
    for (let i = this._logs.length - 1; i >= 0; i--) {
      if (this.updateLog(this._logs[i], deltaTime)) {
        this._logs.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this._logs.forEach((log, index) => this.renderLog(ctx, log, index));
    ctx.restore();
  }

  public renderLog(ctx: CanvasRenderingContext2D, log: LogInfo, index: number): void {
    ctx.fillStyle = log.color.toHexString();
    ctx.font = `${this.fontSize}px`;
    ctx.fillText(log.message, 0, 0 + (index + 1) * this.fontSize * 1.4);
  }

  private updateLog(log: ExLogInfo, deltaTime: number): boolean {
    log.lifeTime -= deltaTime;
    return log.lifeTime < 0;
  }

}
