import { Observable } from 'rxjs/Observable';
import { Vector } from 'Engine/Math/Vector';

export interface PointerEvent {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  locations: ReadonlyArray<Vector>;
}

export const PointerInput = Symbol('PointerInput');

export interface PointerInput {

  readonly pointerStart$: Observable<PointerEvent>;

  readonly pointerEnd$: Observable<PointerEvent>;

  readonly pointerMove$: Observable<PointerEvent>;

  readonly lastPointerPosition: Vector;

}
