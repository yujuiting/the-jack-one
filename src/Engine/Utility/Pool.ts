import { Type } from 'Engine/Utility/Type';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { instantiate } from 'Engine/runtime';

export interface Recyclable {
  canRecycle: boolean;
  destroy(): void;
  reset(): any;
}

export class Pool<T extends Recyclable> {

  private readonly actives = new Set();

  private readonly inactives = new Set();

  private _size = 0;

  get size(): number { return this._size; }

  constructor(private EntityType: Type<T>,
              public readonly max: number = Infinity,
              initSize: number = max <= 1024 ? max : 1024) {
    this._size = initSize;
    for (let i = 0; i < this._size; i++) {
      const instance = instantiate(EntityType);
      instance.destroy();
      // addToArray(this._inactives, instance);
      this.inactives.add(instance);
    }
  }

  public get(): T|undefined {
    if (this.inactives.size === 0) {
      if (this._size < this.max) {
        const instance = instantiate(this.EntityType);
        this.actives.add(instance);
        this._size++;
        return instance;
      } else {
        return;
      }
    } else {
      const instance = this.inactives.values().next().value;
      this.inactives.delete(instance);
      this.actives.add(instance);
      return instance;
    }

  }

  public put(instance: T): void {
    if (this.actives.has(instance)) {
      instance.destroy();
      this.actives.delete(instance);
      this.inactives.add(instance);
    }
  }

}
