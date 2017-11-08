// tslint:disable max-func-body-length cyclomatic-complexity
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Vector } from 'Engine/Math/Vector';
import { Recyclable, Pool, Factory } from 'Engine/Utility/Pool';
import { ForceMode } from 'Engine/Physics/ForceMode';

export class CollisionContact implements Recyclable {

  private static pool: Pool<CollisionContact> = new Pool((
    colliderA: ColliderComponent,
    colliderB: ColliderComponent,
    mtv: Vector,
    point: Vector,
    normal: Vector
  ) => new CollisionContact(colliderA, colliderB, mtv, point, normal));

  public static Get(
    colliderA: ColliderComponent,
    colliderB: ColliderComponent,
    mtv: Vector,
    point: Vector,
    normal: Vector
  ): CollisionContact {
    return (<CollisionContact>this.pool.get(colliderA, colliderB, mtv, point, normal));
  }

  public static Put(collisionContact: CollisionContact): void { this.pool.put(collisionContact); }

  private _canRecycle: boolean = false;

  private _resolved: boolean = false;

  get canRecycle(): boolean { return this._canRecycle; }

  get resolved(): boolean { return this._resolved; }

  constructor(public colliderA: ColliderComponent,
              public colliderB: ColliderComponent,
              public mtv: Vector,
              public point: Vector,
              public normal: Vector) {}

  public resolve(): void {
    if (this._resolved) {
      return;
    }

    const a = this.colliderA;
    const b = this.colliderB;

    const bodyA = a.rigidbody;
    const bodyB = b.rigidbody;

    const shouldAwakeBodyA = bodyB ? !bodyB.isSleeping : false;
    const shouldAwakeBodyB = bodyA ? !bodyA.isSleeping : false;

    if (!bodyA && !bodyB) {
      return;
    }

    const velocityA = bodyA ? bodyA.velocity : Vector.Zero;
    const velocityB = bodyB ? bodyB.velocity : Vector.Zero;

    const angularVelocityA = bodyA ? bodyA.angularVelocity : 0;
    const angularVelocityB = bodyB ? bodyB.angularVelocity : 0;

    const relativeA = this.point.clone().subtract(a.bounds.center);
    const relativeB = this.point.clone().subtract(b.bounds.center);

    const relativeVelocity = velocityB.clone()
      .add(relativeB.cross(-angularVelocityB))
      .subtract(velocityA)
      .subtract(relativeA.cross(-angularVelocityA));

    const rvDotNormal = relativeVelocity.dot(this.normal);

    // Do not resolve if velocities are separating
    if (rvDotNormal > 0) {
      return;
    }

    const restitution = Math.min(this.colliderA.restitution, this.colliderB.restitution);

    const inverseMassA = bodyA ? bodyA.inverseMass : 0;
    const inverseMassB = bodyB ? bodyB.inverseMass : 0;
    const sumOfInverseMass = inverseMassA + inverseMassB;

    const inverseMoiA = bodyA ? bodyA.inverseMoi : 0;
    const inverseMoiB = bodyB ? bodyB.inverseMoi : 0;

    const j_moi_a = Vector.Cross(relativeA.cross(this.normal), relativeA).multiply(inverseMoiA);
    const j_moi_b = Vector.Cross(relativeB.cross(this.normal), relativeB).multiply(inverseMoiB);
    const j_moi = j_moi_a.add(j_moi_b).dot(this.normal);

    // Calculate impulse scalar
    // https://en.wikipedia.org/wiki/Collision_response
    const j = -(1 + restitution) * rvDotNormal / (sumOfInverseMass + j_moi);

    const impulse = this.normal.clone().multiply(j);

    if (bodyA && bodyB) {
      this.mtv.multiply(0.5);
    }

    if (bodyA) {
      if (shouldAwakeBodyA && bodyA.isSleeping) {
        bodyA.awake();
      }

      bodyA.host.transform.position.add(this.mtv.clone().multiply(-1));
      // impulse
      bodyA.addForce(impulse.clone().multiply(-1), ForceMode.Impulse);

      // TODO: force at specific point should cause torque
      // torque
      // bodyA.addTorque(j * relativeA.cross(this.normal) , ForceMode.Impulse);
    }

    if (bodyB) {
      if (shouldAwakeBodyB && bodyB.isSleeping) {
        bodyB.awake();
      }

      bodyB.host.transform.position.add(this.mtv);
      // impulse
      bodyB.addForce(impulse, ForceMode.Impulse);

      // TODO: force at specific point should cause torque
      // torque
      // bodyB.addTorque(j * -relativeB.cross(this.normal) , ForceMode.Impulse);
    }

    const tangent = this.normal.normal();

    let frictionImpulse: Vector;

    const jt_moi_a = Vector.Cross(relativeA.cross(tangent), relativeA).multiply(inverseMoiA);
    const jt_moi_b = Vector.Cross(relativeB.cross(tangent), relativeB).multiply(inverseMoiB);
    const jt_moi = jt_moi_a.add(jt_moi_b).dot(tangent);

    // Solve for the tangent vector
    const t = relativeVelocity.clone().subtract(this.normal.clone().multiply(rvDotNormal)).normalize();

    // Solve for magnitude to apply along the friction vector
    const jt = -relativeVelocity.dot(t) / (sumOfInverseMass + jt_moi);

    // PythagoreanSolve = A^2 + B^2 = C^2, solving for C given A and B
    // Use to approximate mu given friction coefficients of each body
    const mu = Math.sqrt(Math.pow(this.colliderA.friction, 2) + Math.pow(this.colliderB.friction, 2));

    // Clamp magnitude of friction and create impulse vector
    // const frictionImpulse = tangent.clone();
    if (Math.abs( jt ) < j * mu) {
      frictionImpulse = t.clone().multiply(jt);
    } else {
      frictionImpulse = t.clone().multiply(-j * mu);
    }

    if (bodyA) {
      bodyA.addForce(frictionImpulse.clone().multiply(-1), ForceMode.Impulse);
      bodyA.addTorque(-frictionImpulse.dot(t) * relativeA.cross(t) , ForceMode.Impulse);
    }

    if (bodyB) {
      bodyB.addForce(frictionImpulse, ForceMode.Impulse);
      bodyB.addTorque(frictionImpulse.dot(t) * relativeB.cross(t) , ForceMode.Impulse);
    }
  }

  public destroy(): void {
    this._canRecycle = true;
  }

  public reset(colliderA: ColliderComponent,
               colliderB: ColliderComponent,
               mtv: Vector,
               point: Vector,
               normal: Vector): void {
    this.colliderA = colliderA;
    this.colliderB = colliderB;
    this.mtv = mtv;
    this.point = point;
    this.normal = normal;
  }

}
