import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';

export class TouchInput {

  public static Get(): TouchInput { return this.Singleton; }

  private static Singleton: TouchInput = new TouchInput();

  private browserDelegate: BrowserDelegate = BrowserDelegate.Get();

  public get touchStart$(): Observable<TouchEvent> { return this.browserDelegate.touchStart$; }

  public get touchEnd$(): Observable<TouchEvent> { return this.browserDelegate.touchEnd$; }

  public get touchCancel$(): Observable<TouchEvent> { return this.browserDelegate.touchCancel$; }

  public get touchMove$(): Observable<TouchEvent> { return this.browserDelegate.touchMove$; }

  constructor() {
    if (TouchInput.Get()) {
      throw new Error('You should not instantiate TouchInput. Use `TouchInput.Get() instead of.`');
    }
  }

}
