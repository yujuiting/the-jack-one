import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Decorator/Service';

@Service()
export class KeyboardInput {

  public get keyDown$(): Observable<KeyboardEvent> { return this.browserDelegate.keyDown$; }

  public get keyUp$(): Observable<KeyboardEvent> { return this.browserDelegate.keyUp$; }

  constructor(private browserDelegate: BrowserDelegate) {}

}
