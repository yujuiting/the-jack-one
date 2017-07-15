import { Resource } from 'Engine/Resource/Resource';
import { addToArray } from 'Engine/Utility/ArrayUtility';

export class Bundle implements Resource {

  private _isLoaded: boolean = false;

  public get isLoaded(): boolean { return this._isLoaded; }

  constructor(public readonly resources: ReadonlyArray<Resource> = []) {}

  public add(resource: Resource): void {
    if (addToArray(<Resource[]>this.resources, resource)) {
      this._isLoaded = false;
    }
  }

  public load(): Promise<void> {
    if (this._isLoaded) {
      return Promise.resolve();
    }

    return Promise.all(this.resources.map(resource => resource.load())).then(() => {
      this._isLoaded = true;
    });
  }

}
