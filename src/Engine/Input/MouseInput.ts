import { Observable } from 'rxjs/Observable';
import { Vector } from 'Engine/Math/Vector';

export const MouseInput = Symbol('MouseInput');

export interface MouseInput {

  readonly click$: Observable<MouseEvent>;

  readonly mouseMove$: Observable<MouseEvent>;

  readonly mouseDown$: Observable<MouseEvent>;

  readonly mouseUp$: Observable<MouseEvent>;

  readonly wheel$: Observable<MouseEvent>;

}
