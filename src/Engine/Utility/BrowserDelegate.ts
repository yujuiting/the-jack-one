import { Observable } from 'rxjs/Observable';

export const BrowserDelegate = Symbol('BrowserDelegate');

/**
 * Browser API interface for internal usage.
 */
export interface BrowserDelegate {

  readonly window: Window;

  readonly document: Document;

  readonly screen: Screen;

  readonly resize$: Observable<Event>;

  readonly click$: Observable<MouseEvent>;

  readonly mouseMove$: Observable<MouseEvent>;

  readonly mouseDown$: Observable<MouseEvent>;

  readonly mouseUp$: Observable<MouseEvent>;

  readonly wheel$: Observable<WheelEvent>;

  readonly keyDown$: Observable<KeyboardEvent>;

  readonly keyUp$: Observable<KeyboardEvent>;

  readonly touchStart$: Observable<TouchEvent>;

  readonly touchEnd$: Observable<TouchEvent>;

  readonly touchCancel$: Observable<TouchEvent>;

  readonly touchMove$: Observable<TouchEvent>;

  createCanvas(): HTMLCanvasElement;

  getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;

  getAudioContext(): AudioContext;

}
