// tslint:disable max-func-body-length
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Vector } from 'Engine/Math/Vector';
import { Recyclable } from 'Engine/Utility/Pool';
import { ForceMode } from 'Engine/Physics/ForceMode';

export class CollisionContact implements Recyclable {

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

    if (!bodyA && !bodyB) {
      return;
    }

    const velocityA = bodyA ? bodyA.velocity : Vector.Zero;
    const velocityB = bodyB ? bodyB.velocity : Vector.Zero;

    const relativeVelocity = velocityB.clone().subtract(velocityA);

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

    const relativeA = this.point.clone().subtract(a.bounds.center);
    const relativeB = this.point.clone().subtract(b.bounds.center);

    const j_moi_a = Vector.Cross(relativeA.cross(this.normal), relativeA).scale(inverseMoiA);
    const j_moi_b = Vector.Cross(relativeB.cross(this.normal), relativeB).scale(inverseMoiB);
    const j_moi = j_moi_a.clone().add(j_moi_b).dot(this.normal);

    // Calculate impulse scalar
    // https://en.wikipedia.org/wiki/Collision_response
    const j = -(1 + restitution) * rvDotNormal / (sumOfInverseMass + j_moi);

    const impulse = this.normal.clone().scale(j);

    let frictionImpulse: Vector|undefined;

    // check relative velocity and tangent are not perpendicular
    if (relativeVelocity.dot(this.normal.normal()) !== 0) {
      // Solve for the tangent vector
      const t = relativeVelocity.clone().subtract(this.normal.clone().scale(rvDotNormal)).normalize();

      // Solve for magnitude to apply along the friction vector
      const jt = -relativeVelocity.dot(t) / sumOfInverseMass;

      // PythagoreanSolve = A^2 + B^2 = C^2, solving for C given A and B
      // Use to approximate mu given friction coefficients of each body
      const mu = Math.sqrt(Math.pow(this.colliderA.friction, 2) + Math.pow(this.colliderB.friction, 2));

      // Clamp magnitude of friction and create impulse vector
      // const frictionImpulse = tangent.clone();
      if (Math.abs( jt ) < j * mu) {
        frictionImpulse = t.scale(jt);
      } else {
        frictionImpulse = t.scale(-j * mu);
      }
    }

    if (bodyA && bodyB) {
      this.mtv.scale(-0.5);
      bodyA.host.transform.position.add(this.mtv);
      bodyB.host.transform.position.add(this.mtv.scale(-1));
      // impulse
      bodyA.addForce(impulse.clone().scale(-inverseMassA), ForceMode.Impulse);
      bodyB.addForce(impulse.clone().scale(inverseMassB), ForceMode.Impulse);
      // friction
      if (frictionImpulse) {
        bodyA.addForce(frictionImpulse.clone().scale(-inverseMassA), ForceMode.Impulse);
        bodyB.addForce(frictionImpulse.clone().scale(inverseMassB), ForceMode.Impulse);
      }
      // torque
      bodyA.addTorque(j * -relativeA.cross(this.normal) , ForceMode.Impulse);
      bodyB.addTorque(j * relativeB.cross(this.normal) , ForceMode.Impulse);
    } else if (bodyA) {
      bodyA.host.transform.position.add(this.mtv.scale(-1));
      // impulse
      bodyA.addForce(impulse.clone().scale(-inverseMassA), ForceMode.Impulse);
      // friction
      if (frictionImpulse) {
        bodyA.addForce(frictionImpulse.clone().scale(-inverseMassA), ForceMode.Impulse);
      }
      // torque
      bodyA.addTorque(j * -relativeA.cross(this.normal) , ForceMode.Impulse);
    } else if (bodyB) {
      bodyB.host.transform.position.add(this.mtv);
      // impulse
      bodyB.addForce(impulse.clone().scale(inverseMassB), ForceMode.Impulse);
      // friction
      if (frictionImpulse) {
        bodyB.addForce(frictionImpulse.clone().scale(inverseMassB), ForceMode.Impulse);
      }
      // torque
      bodyB.addTorque(j * relativeB.cross(this.normal) , ForceMode.Impulse);
    }
  }

  public destroy(): void {
    this._canRecycle = true;
  }

}
