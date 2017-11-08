import { Type } from 'Engine/Utility/Type';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';

export interface Recyclable {
  canRecycle: boolean;
  destroy(): void;
}

interface InternalPool {
  size: number;
}

export class Pool<T extends Recyclable> {

  private readonly _actives: T[] = [];

  private readonly _inactives: T[] = [];

  public readonly size = 0;

  constructor(private type: Type<T>,
              public readonly max: number = Infinity) {}

  public get(...args: any[]): T|undefined {
    let instance: T|undefined = this._inactives.shift();

    if (!instance) {
      if (this.size < this.max) {
        instance = new this.type(...args);
        addToArray(this._actives, instance);
        (<InternalPool>this).size++;
      }
    }

    return instance;
  }

  public put(instance: T): void {
    if (removeFromArray(this._actives, instance)) {
      instance.destroy();
      this._inactives.push(instance);
      (<InternalPool>this).size--;
    }
  }

}
