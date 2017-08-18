import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Decorator/Service';
import { Inject } from 'Engine/Decorator/Inject';

@Service()
export class MouseInput {

  public get click$(): Observable<MouseEvent> { return this.browserDelegate.click$; }

  public get mouseMove$(): Observable<MouseEvent> { return this.browserDelegate.mouseMove$; }

  public get mouseDown$(): Observable<MouseEvent> { return this.browserDelegate.mouseDown$; }

  public get mouseUp$(): Observable<MouseEvent> { return this.browserDelegate.mouseUp$; }

  public get wheel$(): Observable<MouseEvent> { return this.browserDelegate.wheel$; }

  constructor(private browserDelegate: BrowserDelegate) {}

}
