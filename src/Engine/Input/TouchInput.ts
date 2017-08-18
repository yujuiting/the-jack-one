import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Decorator/Service';
import { Inject } from 'Engine/Decorator/Inject';

@Service()
export class TouchInput {

  public get touchStart$(): Observable<TouchEvent> { return this.browserDelegate.touchStart$; }

  public get touchEnd$(): Observable<TouchEvent> { return this.browserDelegate.touchEnd$; }

  public get touchCancel$(): Observable<TouchEvent> { return this.browserDelegate.touchCancel$; }

  public get touchMove$(): Observable<TouchEvent> { return this.browserDelegate.touchMove$; }

  constructor(private browserDelegate: BrowserDelegate) {}

}
