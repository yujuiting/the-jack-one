import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Pair } from 'Engine/Physics/Pair';
import { Service } from 'Engine/Decorator/Service';

@Service()
export class NarrowPhaseCollisionResolver {

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
