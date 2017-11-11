import { Observable } from 'rxjs/Observable';
import { Vector } from 'Engine/Math/Vector';

export const TouchInput = Symbol('TouchInput');

export interface TouchInput {

  readonly touchStart$: Observable<TouchEvent>;

  readonly touchEnd$: Observable<TouchEvent>;

  readonly touchCancel$: Observable<TouchEvent>;

  readonly touchMove$: Observable<TouchEvent>;

}
