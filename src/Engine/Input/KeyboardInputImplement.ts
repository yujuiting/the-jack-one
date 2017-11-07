import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Decorator/Service';
import { KeyboardInput } from 'Engine/Input/KeyboardInput';
import { Inject } from 'Engine/Decorator/Inject';

@Service(KeyboardInput)
export class KeyboardInputImplement implements KeyboardInput {

  public get keyDown$(): Observable<KeyboardEvent> { return this.browserDelegate.keyDown$; }

  public get keyUp$(): Observable<KeyboardEvent> { return this.browserDelegate.keyUp$; }

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

}
