import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Decorator/Service';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';

@Service(BrowserDelegate)
export class BrowserDelegateImplement implements BrowserDelegate {

  public readonly window: Window = window;

  public readonly document: Document = this.window.document;

  public readonly screen: Screen = window.screen;

  public readonly resize$: Observable<Event> = Observable.fromEvent(this.window, 'resize');

  public readonly click$: Observable<MouseEvent> = Observable.fromEvent(this.window, 'click');

  public readonly mouseMove$: Observable<MouseEvent> = Observable.fromEvent(this.window, 'mousemove');

  public readonly mouseDown$: Observable<MouseEvent> = Observable.fromEvent(this.window, 'mousedown');

  public readonly mouseUp$: Observable<MouseEvent> = Observable.fromEvent(this.window, 'mouseup');

  public readonly wheel$: Observable<WheelEvent> = Observable.fromEvent(this.window, 'wheel');

  public readonly keyDown$: Observable<KeyboardEvent> = Observable.fromEvent(this.window, 'keydown');

  public readonly keyUp$: Observable<KeyboardEvent> = Observable.fromEvent(this.window, 'keyup');

  public readonly touchStart$: Observable<TouchEvent> = Observable.fromEvent(this.window, 'touchstart');

  public readonly touchEnd$: Observable<TouchEvent> = Observable.fromEvent(this.window, 'touchend');

  public readonly touchCancel$: Observable<TouchEvent> = Observable.fromEvent(this.window, 'touchcancel');

  public readonly touchMove$: Observable<TouchEvent> = Observable.fromEvent(this.window, 'touchmove');

  constructor() {
    this.document.body.style.margin = '0';
    this.document.body.style.width = '100%';
    this.document.body.style.height = '100%';

    // prevent bounce scrolling in device
    this.document.body.style.overflow = 'hidden';

    // TODO: handle window.devicePixelRatio
    // Lock device scale currently.
    const meta = this.document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    this.document.head.appendChild(meta);
  }

  public createCanvas(): HTMLCanvasElement {
    return this.document.createElement('canvas');
  }

  public getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    return <CanvasRenderingContext2D>canvas.getContext('2d');
  }

  public getAudioContext(): AudioContext {
    try {
      return new (AudioContext || (<any>window).webkitAudioContext)();
    } catch (err) {
      throw new Error('Not support audio context');
    }
  }

}
