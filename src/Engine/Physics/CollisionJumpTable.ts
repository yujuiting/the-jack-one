import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { CollisionContact } from 'Engine/Physics/CollisionContact';

export const CollisionJumpTable = Symbol('CollisionJumpTable');

export interface CollisionJumpTable {

  circleCircle(colliderA: CircleColliderComponent, colliderB: CircleColliderComponent): CollisionContact|undefined;

  circlePolygon(colliderA: CircleColliderComponent, colliderB: PolygonColliderComponent): CollisionContact|undefined;

  polygonPolygon(colliderA: PolygonColliderComponent, colliderB: PolygonColliderComponent): CollisionContact|undefined;

}
