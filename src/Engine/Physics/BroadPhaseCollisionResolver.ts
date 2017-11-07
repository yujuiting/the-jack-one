import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Pair } from 'Engine/Physics/Pair';
import { Camera } from 'Engine/Core/Camera';

export const BroadPhaseCollisionResolver = Symbol('BroadPhaseCollisionResolver');

export interface BroadPhaseCollisionResolver {

  pairs: ReadonlyArray<Pair>;

  track(collider: ColliderComponent): boolean;

  untrack(collider: ColliderComponent): boolean;

  fixedUpdate(): void;

  update(): void;

  // It will be called if defined DEBUG_PHYSICS
  debugRender(ctx: CanvasRenderingContext2D, camera: Camera): void;

}
