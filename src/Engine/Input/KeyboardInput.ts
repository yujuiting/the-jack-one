import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Utility/Decorator/Service';
import { Inject } from 'Engine/Utility/Decorator/Inject';

@Service()
export class KeyboardInput {

  public get keyDown$(): Observable<KeyboardEvent> { return this.browserDelegate.keyDown$; }

  public get keyUp$(): Observable<KeyboardEvent> { return this.browserDelegate.keyUp$; }

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

}
