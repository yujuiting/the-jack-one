import { Service } from 'Engine/Decorator/Service';
import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { CollisionContact } from 'Engine/Physics/CollisionContact';
import { Vector } from 'Engine/Math/Vector';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { CollisionJumpTable } from 'Engine/Physics/CollisionJumpTable';

@Service(CollisionJumpTable)
export class CollisionJumpTableImplement implements CollisionJumpTable {

  public circleCircle(colliderA: CircleColliderComponent, colliderB: CircleColliderComponent): CollisionContact|undefined {
    const maxDistance = colliderA.calculatedRadius + colliderB.calculatedRadius;
    const positionA = colliderA.bounds.center;
    const positionB = colliderB.bounds.center;

    const distance = positionA.distanceTo(positionB);

    if (distance > maxDistance) {
      return;
    }

    const normal = positionB.clone().subtract(positionA).multiply(colliderA.radius / distance);

    const point = positionA.clone().add(normal);

    normal.normalize();

    const mtv = normal.clone().multiply(maxDistance - distance);

    return CollisionContact.Get(colliderA, colliderB, mtv, point, normal);
  }

  public circlePolygon(colliderA: CircleColliderComponent, colliderB: PolygonColliderComponent): CollisionContact|undefined  {
    const positionA = colliderA.bounds.center;
    const positionB = colliderB.bounds.center;

    const minAxis = this.circleBoxSAT(colliderA, colliderB);

    if (!minAxis) {
      return;
    }

    const ab = positionB.clone().subtract(positionA);
    const hasSameDirection = minAxis.dot(ab) >= 0;
    if (!hasSameDirection) {
      minAxis.multiply(-1);
    }

    const normal = minAxis.clone().normalize();

    const pointA = colliderA.getFurthestPoint(minAxis);
    const pointB = colliderB.getFurthestPoint(minAxis);
    const containsPointA = colliderB.contains(pointA);
    const containsPointB = colliderA.contains(pointB);

    let contactPoint: Vector;

    if (containsPointA && containsPointB) {
      contactPoint = pointA.add(pointB).multiply(0.5);
    } else if (containsPointA) {
      contactPoint = pointA;
    } else if (containsPointB) {
      contactPoint = pointB;
    } else {
      // I am not sure what is this condition...
      contactPoint = pointA.add(pointB).multiply(0.5);
    }

    return CollisionContact.Get(colliderA, colliderB, minAxis, contactPoint, normal);
  }

  public polygonPolygon(colliderA: PolygonColliderComponent, colliderB: PolygonColliderComponent): CollisionContact|undefined  {
    const positionA = colliderA.bounds.center;
    const positionB = colliderB.bounds.center;

    const minAxis = this.polygonPolygonSAT(colliderA, colliderB);

    if (!minAxis) {
      return;
    }

    const ab = positionB.clone().subtract(positionA);
    const hasSameDirection = minAxis.dot(ab) >= 0;
    if (!hasSameDirection) {
      minAxis.multiply(-1);
    }

    const normal = minAxis.clone().normalize();

    const pointA = colliderA.getFurthestPoint(minAxis);
    const pointB = colliderB.getFurthestPoint(minAxis);
    const containsPointA = colliderB.contains(pointA);
    const containsPointB = colliderA.contains(pointB);

    let contactPoint: Vector;

    if (containsPointA && containsPointB) {
      contactPoint = pointA.clone().add(pointB).multiply(0.5);
    } else if (containsPointA) {
      contactPoint = pointA.clone();
    } else if (containsPointB) {
      contactPoint = pointB.clone();
    } else {
      // I am not sure what is this condition...
      contactPoint = pointA.clone().add(pointB).multiply(0.5);
    }

    return CollisionContact.Get(colliderA, colliderB, minAxis, contactPoint, normal);
  }

  /**
   * Helper for calculate mtv through SAT
   * @see http://www.dyn4j.org/2010/01/sat/
   */
  private polygonPolygonSAT(colliderA: PolygonColliderComponent, colliderB: PolygonColliderComponent): Vector|undefined {
    const axes = [...colliderA.calculatedAxes, ...colliderB.calculatedAxes].map(axis => axis.normal());
    return this.findMTV(colliderA, colliderB, axes);
  }

  /**
   * Helper for calculate mtv through SAT
   * @see http://www.dyn4j.org/2010/01/sat/
   */
  private circleBoxSAT(colliderA: CircleColliderComponent, colliderB: PolygonColliderComponent): Vector|undefined {
    const positionA = colliderA.bounds.center;
    const positionB = colliderB.bounds.center;
    const ba = positionA.clone().subtract(positionB);
    const closestPointOnPoly = colliderB.getFurthestPoint(ba);
    const axes = [...colliderB.calculatedAxes.map(axis => axis.normal()), positionA.clone().subtract(closestPointOnPoly).normalize()];

    return this.findMTV(colliderA, colliderB, axes);
  }

  private findMTV(colliderA: ColliderComponent, colliderB: ColliderComponent, axes: ReadonlyArray<Vector>): Vector|undefined {
    const count = axes.length;
    let minOverlap = Number.MAX_VALUE;
    let minIndex = -1;

    for (let i = 0; i < count; i++) {
      const projectionA = colliderA.project(axes[i]);
      const projectionB = colliderB.project(axes[i]);
      const overlap = projectionA.getOverlap(projectionB);
      if (overlap <= 0) {
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

    if (axes[minIndex].isZero) {
      return;
    }

    return axes[minIndex].clone().normalize().multiply(minOverlap);
  }

}
