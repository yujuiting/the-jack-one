import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';

export class KeyboardInput {

  public static Get(): KeyboardInput { return this.Singleton; }

  private static Singleton: KeyboardInput = new KeyboardInput();

  private browserDelegate: BrowserDelegate = BrowserDelegate.Get();

  public get keyDown$(): Observable<KeyboardEvent> { return this.browserDelegate.keyDown$; }

  public get keyUp$(): Observable<KeyboardEvent> { return this.browserDelegate.keyUp$; }

  constructor() {
    if (KeyboardInput.Get()) {
      throw new Error('You should not instantiate KeyboardInput. Use `KeyboardInput.Get() instead of.`');
    }
  }

}
