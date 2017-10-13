import { Type } from 'Engine/Utility/Type';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';

export interface Recyclable {
  canRecycle: boolean;
  destroy(): void;
}

export class Pool<T extends Recyclable> {

  private readonly _actives: T[] = [];

  private readonly _inactives: T[] = [];

  get actives(): ReadonlyArray<T> { return this._actives; }

  get inactives(): ReadonlyArray<T> { return this._inactives; }

  constructor(private type: Type<T>,
              public max: number = Infinity) {}

  public get(...args: any[]): T|undefined {
    if (this._inactives.length === 0) {
      this.recycle();
    }

    let instance: T|undefined = this._inactives.shift();

    if (!instance) {
      if (this._actives.length < this.max) {
        instance = new this.type(...args);
        this._actives.push(instance);
        addToArray(this._actives, instance);
      }
    }

    return instance;
  }

  public put(instance: T): void {
    if (removeFromArray(this._actives, instance)) {
      instance.destroy();
    }
  }

  public recycle(): void {
    for (let i = this._actives.length - 1; i >= 0; i--) {
      if (this._actives[i].canRecycle) {
        const item = this._actives[i];
        this._actives.splice(i, 1);
        this._inactives.push(item);
      }
    }
  }

}
