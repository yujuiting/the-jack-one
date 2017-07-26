import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Utility/Decorator/Service';
import { Inject } from 'Engine/Utility/Decorator/Inject';

@Service()
export class TouchInput {

  public get touchStart$(): Observable<TouchEvent> { return this.browserDelegate.touchStart$; }

  public get touchEnd$(): Observable<TouchEvent> { return this.browserDelegate.touchEnd$; }

  public get touchCancel$(): Observable<TouchEvent> { return this.browserDelegate.touchCancel$; }

  public get touchMove$(): Observable<TouchEvent> { return this.browserDelegate.touchMove$; }

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

}
