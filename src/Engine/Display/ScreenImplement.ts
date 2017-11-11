import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Service } from 'Engine/Decorator/Service';
import { Screen } from 'Engine/Display/Screen';
import { Inject } from 'Engine/Decorator/Inject';
import { Vector } from 'Engine/Math/Vector';

@Service(Screen)
export class ScreenImplement implements Screen {

  private _isFullScreen = false;

  private _width = 0;

  private _height = 0;

  get width(): number {
    if (this._width) {
      return this._width;
    }

    return this._isFullScreen ?
      this.browserDelegate.screen.width :
      this.browserDelegate.window.innerWidth;
  }

  get height(): number {
    if (this._height) {
      return this._height;
    }

    return this._isFullScreen ?
      this.browserDelegate.screen.height :
      this.browserDelegate.window.innerHeight;
  }

  get isFullScreen(): boolean { return this._isFullScreen; }

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

  public setFullScreen(enable: boolean = true): void {
    this._isFullScreen = enable;
  }

  public setSize(width: number, height: number): void {
    this._width = width > 0 ? width : 0;
    this._height = height > 0 ? height : 0;
  }

}
