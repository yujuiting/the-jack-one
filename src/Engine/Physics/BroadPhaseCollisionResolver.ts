import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { Pair } from 'Engine/Physics/Pair';
import { Service } from 'Engine/Utility/Decorator/Service';

@Service()
export class BroadPhaseCollisionResolver {

  private readonly awakeColliders: ColliderComponent[] = [];

  private readonly sleepingColliders: ColliderComponent[] = [];

  private readonly _pairs: Pair[] = [];

  get pairs(): ReadonlyArray<Pair> { return this._pairs; }

  public track(collider: ColliderComponent): boolean {
    if (collider.rigidbody && !collider.rigidbody.isSleeping) {
      return addToArray(this.awakeColliders, collider);
    } else {
      return addToArray(this.sleepingColliders, collider);
    }
  }

  public untrack(collider: ColliderComponent): boolean {
    if (removeFromArray(this.awakeColliders, collider)) {
      return true;
    }

    return removeFromArray(this.sleepingColliders, collider);
  }

  public fixedUpdate(): void {
    this._pairs.forEach(pair => Pair.Put(pair));
    this._pairs.splice(0, this._pairs.length);

    const awakeLength = this.awakeColliders.length;
    const sleepingLength = this.sleepingColliders.length;
    let colliderA: ColliderComponent;
    let colliderB: ColliderComponent;

    for (let a = 0; a < awakeLength; a++) {
      colliderA = this.awakeColliders[a];

      for (let b = a + 1; b < awakeLength; b++) {
        colliderB = this.awakeColliders[b];

        if ((colliderA.layer & colliderB.layer) === 0) {
          continue;
        }

        if (colliderA.bounds.intersects(colliderB.bounds)) {
          const pair = Pair.Get(colliderA, colliderB);
          if (pair) {
            this._pairs.push(pair);
          }
        }
      }

      for (let b = 0; b < sleepingLength; b++) {
        colliderB = this.sleepingColliders[b];

        if ((colliderA.layer & colliderB.layer) === 0) {
          continue;
        }

        if (colliderA.bounds.intersects(colliderB.bounds)) {
          const pair = Pair.Get(colliderA, colliderB);
          if (pair) {
            this._pairs.push(pair);
          }
        }
      }
    }
  }

  public update(): void {
    const goToSleep = this.awakeColliders.filter(collider => collider.rigidbody && collider.rigidbody.isSleeping);
    goToSleep.forEach(collider => {
      removeFromArray(this.awakeColliders, collider);
      addToArray(this.sleepingColliders, collider);
    });

    const goToAwake = this.sleepingColliders.filter(collider => collider.rigidbody && !collider.rigidbody.isSleeping);
    goToAwake.forEach(collider => {
      removeFromArray(this.sleepingColliders, collider);
      addToArray(this.awakeColliders, collider);
    });

    this._pairs.forEach(pair => Pair.Put(pair));
    this._pairs.splice(0, this._pairs.length);

    const sleepingLength = this.sleepingColliders.length;
    let colliderA: ColliderComponent;
    let colliderB: ColliderComponent;

    for (let a = 0; a < sleepingLength; a++) {
      colliderA = this.sleepingColliders[a];
      for (let b = a + 1; b < sleepingLength; b++) {
        colliderB = this.sleepingColliders[b];

        if ((colliderA.layer & colliderB.layer) === 0) {
          continue;
        }

        if (colliderA.bounds.intersects(colliderB.bounds)) {
          const pair = Pair.Get(colliderA, colliderB);
          if (pair) {
            this._pairs.push(pair);
          }
        }
      }
    }
  }

}
