import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { Vector } from 'Engine/Math/Vector';
import { Recyclable } from 'Engine/Utility/Pool';
import { ForceMode } from 'Engine/Physics/ForceMode';

export class CollisionContact implements Recyclable {

  private _canRecycle: boolean = false;

  private _resolved: boolean = false;

  get canRecycle(): boolean { return this._canRecycle; }

  get resolved(): boolean { return this._resolved; }

  constructor(public bodyA: RigidbodyComponent,
              public bodyB: RigidbodyComponent,
              public penetration: number,
              public point: Vector,
              public normal: Vector) {}

  public resolve(): void {
    if (this._resolved) {
      return;
    }

    const restitution = Math.min(this.bodyA.restitution, this.bodyB.restitution);

    const relativeVelocity = new Vector();
    relativeVelocity.copy(this.bodyB.velocity);
    relativeVelocity.subtract(this.bodyA.velocity);

    const rvDotNormal = relativeVelocity.dot(this.normal);

    // Do not resolve if velocities are separating
    if (rvDotNormal > 0) {
      return;
    }

    // Calculate impulse scalar
    const j = -(1 + restitution) * rvDotNormal / (this.bodyA.inverseMass + this.bodyB.inverseMass);

    const impulse = this.normal.clone();
    impulse.scale(j);

    // Apply impulse
    this.bodyA.addForce(impulse, ForceMode.Impulse);
    this.bodyB.addForce(impulse, ForceMode.Impulse);

    // Solve for the tangent vector
    const tangent = relativeVelocity.clone();
    const n = this.normal.clone();
    n.scale(rvDotNormal);
    tangent.subtract(n);
    tangent.normalize();

    // Solve for magnitude to apply along the friction vector
    const jt = -relativeVelocity.dot(tangent) / (this.bodyA.inverseMass + this.bodyB.inverseMass);

    // PythagoreanSolve = A^2 + B^2 = C^2, solving for C given A and B
    // Use to approximate mu given friction coefficients of each body
    const mu = Math.sqrt(Math.pow(this.bodyA.friction, 2) + Math.pow(this.bodyB.friction, 2));

    // Clamp magnitude of friction and create impulse vector
    const frictionImpulse = tangent.clone();
    if (Math.abs( jt ) < j * mu) {
      frictionImpulse.scale(jt);
    } else {
      const dynamicFriction = mu * 0.6;
      frictionImpulse.scale(-j * dynamicFriction);
    }

    // Apply
    this.bodyA.addForce(frictionImpulse, ForceMode.Impulse);
    this.bodyB.addForce(frictionImpulse, ForceMode.Impulse);
  }

  public destroy(): void {
    this._canRecycle = true;
  }

}
