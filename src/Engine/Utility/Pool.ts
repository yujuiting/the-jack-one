import { Type } from 'Engine/Utility/Type';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';

export interface Recyclable {
  canRecycle: boolean;
  destroy(): void;
  reset(...args: any[]): void;
}

interface InternalPool {
  size: number;
}

export type Factory<T> = (...args: any[]) => T;

export class Pool<T extends Recyclable> {

  private readonly _actives: T[] = [];

  private readonly _inactives: T[] = [];

  public readonly size = 0;

  constructor(private factory: Factory<T>,
              public readonly max: number = Infinity) {
    (<InternalPool>this).size = max <= 1024 ? max : 1024;
    for (let i = 0; i < this.size; i++) {
      const instance = factory();
      instance.destroy();
      addToArray(this._inactives, instance);
    }
  }

  public get(...args: any[]): T|undefined {
    let instance: T|undefined = this._inactives.shift();

    if (!instance) {
      if (this.size < this.max) {
        instance = this.factory(...args);
        addToArray(this._actives, instance);
        (<InternalPool>this).size++;
      }
    } else {
      instance.reset(...args);
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
