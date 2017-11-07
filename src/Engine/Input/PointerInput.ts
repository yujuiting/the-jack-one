import { Observable } from 'rxjs/Observable';
import { MouseInput } from 'Engine/Input/MouseInput';
import { TouchInput } from 'Engine/Input/TouchInput';
import { listToArray } from 'Engine/Utility/DOM';
import { Vector } from 'Engine/Math/Vector';
import { Service } from 'Engine/Decorator/Service';

export interface PointerEvent {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  locations: ReadonlyArray<Vector>;
}

@Service()
export class PointerInput {

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

  constructor(private mouseInput: MouseInput,
              private touchInput: TouchInput) {}

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
