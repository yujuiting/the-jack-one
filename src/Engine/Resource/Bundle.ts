import { Resource } from 'Engine/Resource/Resource';
import { addToArray } from 'Engine/Utility/ArrayUtility';
import { Observable } from 'rxjs/Observable';

export class Bundle extends Resource {

  constructor(bundleName: string,
              public readonly resources: ReadonlyArray<Resource> = []) {
    super(bundleName);
  }

  public add(resource: Resource): void {
    if (addToArray(<Resource[]>this.resources, resource)) {
      this._isLoaded = false;
    }

    resource.onProgress$.subscribe(this.onProgress);
  }

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }

    try {
      await Promise.all(this.resources.map(async resource => resource.load()));
    } catch (err) {
      this.onError.next(err);
    }

    this._isLoaded = true;
    this.onLoad.next();
  }

  public destroy(): void {
    this.resources.forEach(resource => resource.destroy());
  }

}
