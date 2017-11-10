import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Inject } from 'Engine/Decorator/Inject';
import { Logger } from 'Engine/Core/Logger';

export class Resource<T = any> {

  @Inject(Logger)
  protected logger: Logger;

  protected _data: T;

  protected _isLoaded = false;

  protected onProgress: Subject<ProgressEvent> = new Subject();

  protected onLoad: Subject<void> = new Subject();

  protected onError: Subject<ErrorEvent> = new Subject();

  private _responseType: XMLHttpRequestResponseType = '';

  public get data(): T { return this._data; }

  public get isLoaded(): boolean { return this._isLoaded; }

  public get onProgress$(): Observable<ProgressEvent> { return this.onProgress.asObservable(); }

  public get onLoad$(): Observable<void> { return this.onLoad.asObservable(); }

  public get onError$(): Observable<ErrorEvent> { return this.onError.asObservable(); }

  public get responseType(): XMLHttpRequestResponseType { return this._responseType; }

  public set responseType(value: XMLHttpRequestResponseType) {
    if (this._isLoaded) {
      throw new Error('Cannot set responseType after resource loaded.');
    }
    this._responseType = value;
  }

  constructor(public readonly path: string) {}

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }

    return new Promise<void>(resolve => {

      const request = new XMLHttpRequest();

      request.open('GET', this.path, true);

      request.responseType = this._responseType;

      request.onloadstart = this.onloadstart;

      request.onprogress = this.onprogress;

      request.onerror = this.onerror;

      request.onload = () => {
        this._data = this.processData(request.response);
        this._isLoaded = true;
        this.onLoad.next();
        resolve();
      };

      request.onloadend = this.onloadend;
    });
  }

  protected processData(data: any): any {
    if (this._responseType === 'blob') {
      return URL.createObjectURL(data);
    }
    return data;
  }

  public destroy(): void {
    this.onProgress.complete();
    this.onLoad.complete();
    this.onError.complete();
  }

  protected onloadstart = () => this.logger.log(`start loading resource ${this.path}`);

  protected onprogress = (e: ProgressEvent) => this.onProgress.next(e);

  protected onerror = (e: ErrorEvent) => {
    this.logger.log(`error loading resource ${this.path}`);
    this.onError.next(e);
  }

  protected onloadend = () => this.logger.log(`complete loading resource ${this.path}`);

}
