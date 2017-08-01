import { Service } from 'Engine/Utility/Decorator/Service';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { Vector } from 'Engine/Math/Vector';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';

@Service()
export class CollisionJumpTable {

  public circleCircle(colliderA: CircleColliderComponent, colliderB: CircleColliderComponent): CollisionContact|undefined {
    const maxDistance = colliderA.radius + colliderB.radius;
    const positionA = colliderA.bounds.center;
    const positionB = colliderB.bounds.center;

    const distance = positionA.distanceTo(positionB);

    if (distance > maxDistance) {
      return;
    }

    const normal = positionB.clone().subtract(positionA).scale(colliderA.radius / distance);

    const point = positionA.clone().add(normal);

    normal.normalize();

    const mtv = normal.clone().scale(maxDistance - distance);

    return new CollisionContact(colliderA, colliderB, mtv, point, normal);
  }

  // public circleBox(colliderA: CircleColliderComponent, colliderB: BoxColliderComponent): CollisionContact|undefined  {
  // }

  public boxBox(colliderA: BoxColliderComponent, colliderB: BoxColliderComponent): CollisionContact|undefined  {
    const positionA = colliderA.bounds.center;
    const positionB = colliderB.bounds.center;

    const minAxis = this.boxBoxSAT(colliderA, colliderB);

    if (!minAxis) {
      return;
    }

    const ab = positionB.clone().subtract(positionA);
    const hasSameDirection = minAxis.dot(ab) < 0;
    if (!hasSameDirection) {
      minAxis.scale(-1);
    }

    const normal = minAxis.clone().normalize();

    const pointA = colliderA.getFurthestPoint(minAxis);
    const pointB = colliderB.getFurthestPoint(minAxis);
    const containsPointA = colliderB.contains(pointA);
    const containsPointB = colliderA.contains(pointB);

    let contactPoint: Vector;

    if (containsPointA && containsPointB) {
      contactPoint = pointA.clone().add(pointB).scale(0.5);
    } else if (containsPointA) {
      contactPoint = pointA.clone();
    } else if (containsPointB) {
      contactPoint = pointB.clone();
    } else {
      // I am not sure what is this condition...
      contactPoint = pointA.clone().add(pointB).scale(0.5);
    }

    return new CollisionContact(colliderA, colliderB, minAxis, contactPoint, normal);
  }

  /**
   * Helper for calculate mtv through SAT
   * @see http://www.dyn4j.org/2010/01/sat/
   * @param colliderA
   * @param colliderB
   */
  public boxBoxSAT(colliderA: BoxColliderComponent, colliderB: BoxColliderComponent): Vector|undefined {
    const axes = [...colliderA.axes, ...colliderB.axes];
    const count = axes.length;
    let minOverlap = Number.MAX_VALUE;
    let minIndex = -1;

    for (let i = 0; i < count; i++) {
      const projectionA = colliderA.project(axes[i]);
      const projectionB = colliderB.project(axes[i]);
      const overlap = projectionA.getOverlap(projectionB);
      if (overlap < 0) {
        return;
      } else {
        if (overlap < minOverlap) {
          minOverlap = overlap;
          minIndex = i;
        }
      }
    }

    if (minIndex === -1) {
      return;
    }

    return axes[minIndex].clone().normalize().scale(minOverlap);
  }

  // public circleBoxSAT(colliderA: CircleColliderComponent, colliderB: BoxColliderComponent): Vector|undefined {
  //   const positionA = colliderA.bounds.center;
  //   const positionB = colliderB.bounds.center;
  //   const ba = positionA.subtract(positionB);
  //   const axes = [...colliderB.axes];
  // }

}
