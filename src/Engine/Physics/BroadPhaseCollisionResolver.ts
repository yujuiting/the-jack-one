import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { Pair } from 'Engine/Physics/Pair';
import { Service } from 'Engine/Utility/Decorator/Service';

@Service()
export class BroadPhaseCollisionResolver {

  private readonly _colliders: ColliderComponent[] = [];

  private readonly _pairs: Pair[] = [];

  get colliders(): ReadonlyArray<ColliderComponent> { return this._colliders; }

  get pairs(): ReadonlyArray<Pair> { return this._pairs; }

  public track(collider: ColliderComponent): boolean {
    return addToArray(this._colliders, collider);
  }

  public untrack(collider: ColliderComponent): boolean {
    return removeFromArray(this._colliders, collider);
  }

  public update(): void {
    this._pairs.forEach(pair => Pair.Put(pair));
    this._pairs.splice(0, this._pairs.length);

    const length = this._colliders.length;
    let colliderA: ColliderComponent;
    let colliderB: ColliderComponent;

    for (let a = 0; a < length; a++) {
      colliderA = this._colliders[a];
      for (let b = a + 1; b < length; b++) {
        colliderB = this._colliders[b];

        if ((colliderA.layer & colliderB.layer) === 0) {
          continue;
        }

        if (colliderA.bounds.intersects(colliderB.bounds)) {
          const pair = Pair.Get(colliderA, colliderB);
          if (pair) {
            this._pairs.push();
          }
        }
      }
    }
  }

}
