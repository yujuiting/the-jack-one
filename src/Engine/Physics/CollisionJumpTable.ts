import { Service } from 'Engine/Utility/Decorator/Service';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { CollisionContact } from 'Engine/Physics/CollisionContact';

@Service()
export class CollisionJumpTable {

  public circleCircle(colliderA: CircleColliderComponent, colliderB: CircleColliderComponent): CollisionContact|undefined {
    const maxDistance = colliderA.radius + colliderB.radius;

    const positionA = colliderA.host.transform.position.clone();
    positionA.add(colliderA.bounds.center);

    const positionB = colliderB.host.transform.position.clone();
    positionB.add(colliderB.bounds.center);

    const distance = positionA.distanceTo(positionB);

    if (distance > maxDistance) {
      return;
    }

    const normal = positionB.clone();
    normal.subtract(positionA);

    const point = positionA.clone();
    normal.scale(colliderA.radius / distance);
    point.add(normal);

    normal.normalize();

    const penetration = maxDistance - distance;

    return new CollisionContact(colliderA, colliderB, penetration, point, normal);
  }

  // public boxBox(colliderA: BoxColliderComponent, colliderB: BoxColliderComponent): CollisionContact|undefined  {
  //   const positionA = colliderA.host.transform.position.clone();
  //   positionA.add(colliderA.bounds.center);

  //   const positionB = colliderB.host.transform.position.clone();
  //   positionB.add(colliderB.bounds.center);

  //   const distance = positionA.distanceTo(positionB);

  // }

}
