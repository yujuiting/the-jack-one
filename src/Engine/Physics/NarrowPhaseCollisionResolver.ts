import { Pair } from 'Engine/Physics/Pair';

export const NarrowPhaseCollisionResolver = Symbol('NarrowPhaseCollisionResolver');

export interface NarrowPhaseCollisionResolver {

  resolve(pairs: ReadonlyArray<Pair>): void;

}
