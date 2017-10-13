import { Resource } from 'Engine/Resource/Resource';
import { addToArray } from 'Engine/Utility/ArrayUtility';

export class Bundle extends Resource {

  constructor(public readonly resources: ReadonlyArray<Resource> = []) {
    super();
  }

  public add(resource: Resource): void {
    if (addToArray(<Resource[]>this.resources, resource)) {
      this._isLoaded.next(false);
    }
  }

  public async load(): Promise<void> {
    if (this.isLoaded) {
      return;
    }

    await Promise.all(
      this.resources.map(async resource => resource.load())
    );
    this._isLoaded.next(true);
  }

}
