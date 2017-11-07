import { Observable } from 'rxjs/Observable';

export const TouchInput = Symbol('TouchInput');

export interface TouchInput {

  readonly touchStart$: Observable<TouchEvent>;

  readonly touchEnd$: Observable<TouchEvent>;

  readonly touchCancel$: Observable<TouchEvent>;

  readonly touchMove$: Observable<TouchEvent>;

}
