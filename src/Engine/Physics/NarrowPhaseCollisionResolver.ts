import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Pair } from 'Engine/Physics/Pair';
import { Service } from 'Engine/Utility/Decorator/Service';

@Service()
export class NarrowPhaseCollisionResolver {

  public resolve(pairs: ReadonlyArray<Pair>): void {
    // const collidedPairs = pairs.filter(pair =>
    //   pair.bodyA.bounds.intersectWithBounds(pair.bodyB.bounds));

    // collidedPairs.forEach(pair => this.resolvePair(pair));
  }

  private resolvePair(pair: Pair): void {
    const { bodyA, bodyB } = pair;
    const transformA = bodyA.host.transform;
    const transformB = bodyB.host.transform;
    const rigidbodyA = bodyA.rigidbody;
    const rigidbodyB = bodyB.rigidbody;
  }

}
