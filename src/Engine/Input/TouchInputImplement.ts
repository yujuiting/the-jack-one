import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Observable } from 'rxjs/Observable';
import { Service } from 'Engine/Decorator/Service';
import { TouchInput } from 'Engine/Input/TouchInput';
import { Inject } from 'Engine/Decorator/Inject';
import { Vector } from 'Engine/Math/Vector';

@Service(TouchInput)
export class TouchInputImplement implements TouchInput {

  public get touchStart$(): Observable<TouchEvent> { return this.browserDelegate.touchStart$; }

  public get touchEnd$(): Observable<TouchEvent> { return this.browserDelegate.touchEnd$; }

  public get touchCancel$(): Observable<TouchEvent> { return this.browserDelegate.touchCancel$; }

  public get touchMove$(): Observable<TouchEvent> { return this.browserDelegate.touchMove$; }

  constructor(@Inject(BrowserDelegate) private browserDelegate: BrowserDelegate) {}

}
