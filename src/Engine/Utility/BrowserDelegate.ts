import { Observable } from 'rxjs/Observable';
import { observeEvent } from 'Engine/Utility/DOM';
import { Service } from 'Engine/Utility/Decorator/Service';

/**
 * Browser API interface for internal usage.
 */
@Service()
export class BrowserDelegate {

  public readonly window: Window = window;

  public readonly document: Document = this.window.document;

  public readonly screen: Screen = window.screen;

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
    this.document.body.style.margin = '0';
    this.document.body.style.width = '100%';
    this.document.body.style.height = '100%';
    this.document.body.style.overflow = 'auto';
  }

  public createCanvas(): HTMLCanvasElement {
    return this.document.createElement('canvas');
  }

  public getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    return <CanvasRenderingContext2D>canvas.getContext('2d');
  }

}
