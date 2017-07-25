import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Service } from 'Engine/Utility/Decorator/Service';
import { Inject } from 'Engine/Utility/Decorator/Inject';

@Service()
export class Screen {

  private _width: number = 0;

  private _height: number = 0;

  private _isFullScreen: boolean = false;

  get width(): number {
    return this._isFullScreen ?
      this.browserDelegate.screen.width :
      this.browserDelegate.window.innerWidth;
  }

  get height(): number {
    return this._isFullScreen ?
      this.browserDelegate.screen.height :
      this.browserDelegate.window.innerHeight;
  }

  get isFullScreen(): boolean { return this._isFullScreen; }

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

  public setFullScreen(enable: boolean = true): void {
    this._isFullScreen = enable;
  }

}
