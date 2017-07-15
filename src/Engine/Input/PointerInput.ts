import { Observable } from 'rxjs/Observable';
import { MouseInput } from 'Engine/Input/MouseInput';
import { TouchInput } from 'Engine/Input/TouchInput';
import { listToArray } from 'Engine/Utility/DOM';
import { Vector } from 'Engine/Math/Vector';

// interface TouchEvent extends UIEvent {
//     readonly altKey: boolean;
//     readonly changedTouches: TouchList;
//     readonly charCode: number;
//     readonly ctrlKey: boolean;
//     readonly keyCode: number;
//     readonly metaKey: boolean;
//     readonly shiftKey: boolean;
//     readonly targetTouches: TouchList;
//     readonly touches: TouchList;
//     readonly which: number;
// }

// interface MouseEvent extends UIEvent {
//     readonly altKey: boolean;
//     readonly button: number;
//     readonly buttons: number;
//     readonly clientX: number;
//     readonly clientY: number;
//     readonly ctrlKey: boolean;
//     readonly fromElement: Element;
//     readonly layerX: number;
//     readonly layerY: number;
//     readonly metaKey: boolean;
//     readonly movementX: number;
//     readonly movementY: number;
//     readonly offsetX: number;
//     readonly offsetY: number;
//     readonly pageX: number;
//     readonly pageY: number;
//     readonly relatedTarget: EventTarget;
//     readonly screenX: number;
//     readonly screenY: number;
//     readonly shiftKey: boolean;
//     readonly toElement: Element;
//     readonly which: number;
//     readonly x: number;
//     readonly y: number;
//     getModifierState(keyArg: string): boolean;
// }

export interface PointerEvent {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  locations: ReadonlyArray<Vector>;
}

export class PointerInput {

  public static Get(): PointerInput { return this.Singleton; }

  private static Singleton: PointerInput = new PointerInput();

  private mouseInput: MouseInput = MouseInput.Get();

  private touchInput: TouchInput = TouchInput.Get();

  public get pointerStart$(): Observable<PointerEvent> {
    return Observable.merge(
      this.mouseInput.mouseDown$.map(e => this.parseMouseEvent(e)),
      this.touchInput.touchStart$.map(e => this.parseTouchEvent(e))
    );
  }

  public get pointerEnd$(): Observable<PointerEvent> {
    return Observable.merge(
      this.mouseInput.mouseUp$.map(e => this.parseMouseEvent(e)),
      this.touchInput.touchEnd$.map(e => this.parseTouchEvent(e))
    );
  }

  public get pointerMove$(): Observable<PointerEvent> {
    return Observable.merge(
      this.mouseInput.mouseMove$.map(e => this.parseMouseEvent(e)),
      this.touchInput.touchMove$.map(e => this.parseTouchEvent(e))
    );
  }

  constructor() {
    if (PointerInput.Get()) {
      throw new Error('You should not instantiate PointerInput. Use `PointerInput.Get() instead of.`');
    }
  }

  private parseMouseEvent(e: MouseEvent): PointerEvent {
    return {
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      locations: [Vector.Get(e.clientX, e.clientY)]
    };
  }

  private parseTouchEvent(e: TouchEvent): PointerEvent {
    const locations: Vector[] = [];

    listToArray<Touch|null>(e.touches).forEach(touch => {
      if (touch) {
        locations.push(Vector.Get(touch.clientX, touch.clientY));
      }
    });

    return {
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      locations
    };
  }

}
