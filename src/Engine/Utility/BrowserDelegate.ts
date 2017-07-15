import { Observable } from 'rxjs/Observable';
import { observeEvent } from 'Engine/Utility/DOM';

/**
 * Browser API interface for internal usage.
 */
export class BrowserDelegate {

  public static Get(): BrowserDelegate { return this.Singleton; }

  private static Singleton: BrowserDelegate = new BrowserDelegate();

  public readonly window: Window = window;

  public readonly document: Document = document;

  public readonly screen: Screen = screen;

  public readonly resize$: Observable<Event> = observeEvent(this.window, 'resize');

  public readonly click$: Observable<MouseEvent> = observeEvent(this.window, 'click');

  public readonly mouseMove$: Observable<MouseEvent> = observeEvent(this.window, 'mousemove');

  public readonly mouseDown$: Observable<MouseEvent> = observeEvent(this.window, 'mousedown');

  public readonly mouseUp$: Observable<MouseEvent> = observeEvent(this.window, 'mouseup');

  public readonly wheel$: Observable<WheelEvent> = observeEvent(this.window, 'wheel');

  public readonly keyDown$: Observable<KeyboardEvent> = observeEvent(this.window, 'keydown');

  public readonly keyUp$: Observable<KeyboardEvent> = observeEvent(this.window, 'keyup');

  public readonly touchStart$: Observable<TouchEvent> = observeEvent(this.window, 'touchstart');

  public readonly touchEnd$: Observable<TouchEvent> = observeEvent(this.window, 'touchend');

  public readonly touchCancel$: Observable<TouchEvent> = observeEvent(this.window, 'touchcancel');

  public readonly touchMove$: Observable<TouchEvent> = observeEvent(this.window, 'touchmove');

  constructor() {
    if (BrowserDelegate.Get()) {
      throw new Error('You should not instantiate BrowserDelegate. Use `BrowserDelegate.Get() instead of.`');
    }

    this.document.body.style.margin = '0';
    this.document.body.style.width = '100%';
    this.document.body.style.height = '100%';
    this.document.body.style.overflow = 'auto';
  }

}
