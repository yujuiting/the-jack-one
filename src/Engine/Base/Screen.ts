import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Service } from 'Engine/Decorator/Service';
import { Inject } from 'Engine/Decorator/Inject';

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

  constructor(private browserDelegate: BrowserDelegate) {}

  public setFullScreen(enable: boolean = true): void {
    this._isFullScreen = enable;
  }

}
