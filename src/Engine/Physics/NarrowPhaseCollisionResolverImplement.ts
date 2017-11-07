import { Pair } from 'Engine/Physics/Pair';
import { Service } from 'Engine/Decorator/Service';
import { NarrowPhaseCollisionResolver } from 'Engine/Physics/NarrowPhaseCollisionResolver';

@Service(NarrowPhaseCollisionResolver)
export class NarrowPhaseCollisionResolverImplement implements NarrowPhaseCollisionResolver {

  public resolve(pairs: ReadonlyArray<Pair>): void {
    pairs.forEach(pair => this.resolvePair(pair));
  }

  private resolvePair(pair: Pair): void {
    const { bodyA, bodyB } = pair;
    const collisionConctact = bodyA.collide(bodyB);
    if (collisionConctact) {
      collisionConctact.resolve();
    }
  }

}
