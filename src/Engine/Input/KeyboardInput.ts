import { Observable } from 'rxjs/Observable';

export const KeyboardInput = Symbol('KeyboardInput');

export interface KeyboardInput {

  readonly keyDown$: Observable<KeyboardEvent>;

  readonly keyUp$: Observable<KeyboardEvent>;

}
