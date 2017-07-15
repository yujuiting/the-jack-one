import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';

export class MouseInput {

  public static Get(): MouseInput { return this.Singleton; }

  private static Singleton: MouseInput = new MouseInput();

  private browserDelegate: BrowserDelegate = BrowserDelegate.Get();

  public get click$(): Observable<MouseEvent> { return this.browserDelegate.click$; }

  public get mouseMove$(): Observable<MouseEvent> { return this.browserDelegate.mouseMove$; }

  public get mouseDown$(): Observable<MouseEvent> { return this.browserDelegate.mouseDown$; }

  public get mouseUp$(): Observable<MouseEvent> { return this.browserDelegate.mouseUp$; }

  public get wheel$(): Observable<MouseEvent> { return this.browserDelegate.wheel$; }

  constructor() {
    if (MouseInput.Get()) {
      throw new Error('You should not instantiate MouseInput. Use `MouseInput.Get() instead of.`');
    }
  }

}
