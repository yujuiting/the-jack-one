import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';

export class Screen {

  public static Get(): Screen { return this.Singleton; }

  private static Singleton: Screen = new Screen();

  private _width: number;

  private _height: number;

  private _isFullScreen: boolean;

  private browserDelegate: BrowserDelegate = BrowserDelegate.Get();

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

  constructor() {
    if (Screen.Get()) {
      throw new Error('You should not instantiate Screen. Use `Screen.Get() instead of.`');
    }

    this.setFullScreen(false);
  }

  public setFullScreen(enable: boolean = true): void {
    this._isFullScreen = enable;
  }

}
