import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export abstract class Resource<T = void> {

  protected _isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get isLoaded(): boolean { return this._isLoaded.value; }

  public get isLoaded$(): Observable<void> {
    return this._isLoaded.asObservable()
                         .filter(isLoad => isLoad)
                         .map(() => void 0);
  }

  public abstract load(): Promise<T>;

  public destroy(): void {
    // TODO: check all reference.
    this._isLoaded.complete();
  }

}
