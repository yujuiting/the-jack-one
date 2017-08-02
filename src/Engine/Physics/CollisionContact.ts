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

    const bodyA = this.colliderA.rigidbody;
    const bodyB = this.colliderB.rigidbody;
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

    // Calculate impulse scalar
    const j = -(1 + restitution) * rvDotNormal / sumOfInverseMass;

    const impulse = this.normal.clone().scale(j);

    // Apply impulse
    if (bodyA) {
      bodyA.addForce(impulse.clone().scale(-1), ForceMode.Impulse);
    }

    if (bodyB) {
      bodyB.addForce(impulse, ForceMode.Impulse);
    }

    // Solve for the tangent vector
    // const n = this.normal.clone().scale(rvDotNormal);
    // const tangent = relativeVelocity.clone().subtract(n).normalize();
    const tangent = this.normal.clone().normal();

    // Solve for magnitude to apply along the friction vector
    const jt = -relativeVelocity.dot(tangent) / sumOfInverseMass;

    // PythagoreanSolve = A^2 + B^2 = C^2, solving for C given A and B
    // Use to approximate mu given friction coefficients of each body
    const mu = Math.sqrt(Math.pow(this.colliderA.friction, 2) + Math.pow(this.colliderB.friction, 2));

    // Clamp magnitude of friction and create impulse vector
    const frictionImpulse = tangent.clone();
    if (Math.abs( jt ) < j * mu) {
      frictionImpulse.scale(jt);
    } else {
      const dynamicFriction = mu * 0.6;
      frictionImpulse.scale(-j * dynamicFriction);
    }

    // Apply
    if (bodyA) {
      bodyA.addForce(frictionImpulse, ForceMode.Impulse);
    }

    if (bodyB) {
      bodyB.addForce(frictionImpulse, ForceMode.Impulse);
    }
  }

  public destroy(): void {
    this._canRecycle = true;
  }

}
