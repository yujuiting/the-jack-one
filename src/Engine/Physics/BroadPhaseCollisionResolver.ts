import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Pair } from 'Engine/Physics/Pair';

export const BroadPhaseCollisionResolver = Symbol('BroadPhaseCollisionResolver');

export interface BroadPhaseCollisionResolver {

  pairs: ReadonlyArray<Pair>;

  track(collider: ColliderComponent): boolean;

  untrack(collider: ColliderComponent): boolean;

  fixedUpdate(): void;

  update(): void;

}
