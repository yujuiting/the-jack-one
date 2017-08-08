import { GameObject } from 'Engine/Base/GameObject';
import { Component } from 'Engine/Base/Component';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Vector } from 'Engine/Math/Vector';
import { Engine } from 'Engine/Base/Engine';
import { Time } from 'Engine/Time/Time';
import { ForceMode } from 'Engine/Physics/ForceMode';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';
import { Inject } from 'Engine/Utility/Decorator/Inject';

interface InternalRigidbodyComponent extends RigidbodyComponent {
  motion: number;
  inverseMass: number;
  inverseMoi: number;
}

const DoublePI = Math.PI * 2;

@UniqueComponent()
@RequireComponent([TransformComponent])
export class RigidbodyComponent extends Component {

  public angularDrag: number;

  /**
   * radians per second
   */
  public angularVelocity: number;

  public drag: number;

  public freezeRotation: boolean;

  /**
   * In kilogram
   */
  private _mass: number;

  public get mass(): number { return this._mass; }

  public set mass(value: number) { this._mass = value; (<InternalRigidbodyComponent>this).inverseMass = 1 / value; }

  public readonly inverseMass: number;

  /**
   * moment of inertia
   */
  private _moi: number;

  public get moi(): number { return this._moi; }

  public set moi(value: number) { this._moi = value; (<InternalRigidbodyComponent>this).inverseMoi = 1 / value; }

  public readonly inverseMoi: number;

  public maxAngularVelocity: number;

  /**
   * pixel per second
   */
  public velocity: Vector;

  public useGravity: boolean;

  public isSleeping: boolean;

  public sleepThreshold: number;

  public readonly motion: number;

  private forces: Vector[];

  private torques: number[];

  private sleepTimer: number;

  private transform: TransformComponent = <TransformComponent>this.getComponent(TransformComponent);

  constructor(host: GameObject,
              @Inject(Engine) private engine: Engine,
              @Inject(Time) private time: Time) {
    super(host);
  }

  public addForce(force: Vector, forceMode: ForceMode = ForceMode.Force): void {
    this.forces[forceMode].add(force);
  }

  public addTorque(torque: number, forceMode: ForceMode = ForceMode.Force): void {
    this.torques[forceMode] += torque;
  }

  public clearForce(): void {
    this.forces.forEach(force => force.reset());
  }

  public clearTorque(): void {
    for (let i = 0; i < this.torques.length; i++) {
      this.torques[i] = 0;
    }
  }

  public sleep(): void {
    this.isSleeping = true;
    this.velocity.reset();
    this.angularVelocity = 0;
    this.clearForce();
    this.clearTorque();
  }

  public awake(): void {
    this.isSleeping = false;
    this.sleepTimer = 0;
  }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);

    const deltaTimeInSecond = this.time.fixedDeltaTimeInSecond * alpha;

    if (this.useGravity && !this.isSleeping) {
      this.addForce(this.engine.gravity, ForceMode.Acceleration);
    }

    /**
     * Force
     * f = ma = m∆v/∆t
     * ∆tf = m∆v
     * ∆v = ∆tf/m
     */
    this.forces[ForceMode.Force].scale(deltaTimeInSecond * this.inverseMass);
    this.velocity.add(this.forces[ForceMode.Force]);
    this.forces[ForceMode.Force].reset();

    /**
     * Acceleration ignore mass.
     */
    this.forces[ForceMode.Acceleration].scale(deltaTimeInSecond);
    this.velocity.add(this.forces[ForceMode.Acceleration]);
    this.forces[ForceMode.Acceleration].reset();

    /**
     * Impulse handle without delta time.
     */
    this.forces[ForceMode.Impulse].scale(1 * this.inverseMass);
    this.velocity.add(this.forces[ForceMode.Impulse]);
    this.forces[ForceMode.Impulse].reset();

    /**
     * VelocityChange without delta time and mass.
     */
    this.velocity.add(this.forces[ForceMode.VelocityChange]);
    this.forces[ForceMode.VelocityChange].reset();

    /**
     * Torque
     */
    this.torques[ForceMode.Force] *= this.inverseMoi * deltaTimeInSecond;
    this.angularVelocity += this.torques[ForceMode.Force];
    this.torques[ForceMode.Force] = 0;

    this.torques[ForceMode.Acceleration] *= deltaTimeInSecond;
    this.angularVelocity += this.torques[ForceMode.Acceleration];
    this.torques[ForceMode.Acceleration] = 0;

    this.torques[ForceMode.Impulse] *= this.inverseMoi;
    this.angularVelocity += this.torques[ForceMode.Impulse];
    this.torques[ForceMode.Impulse] = 0;

    this.angularVelocity += this.torques[ForceMode.VelocityChange];
    this.torques[ForceMode.VelocityChange] = 0;

    (<InternalRigidbodyComponent>this)
      .motion = (this.velocity.squareMagnitude() + Math.pow(this.angularVelocity, 2)) * 0.5;

    if (!this.isSleeping && this.sleepThreshold >= 0) {
      if (this.motion < this.sleepThreshold) {
        this.sleepTimer += deltaTimeInSecond;

        if (this.sleepTimer > 0.5) {
          this.sleepTimer = 0;
          this.sleep();
        }
      } else {
        this.sleepTimer = 0;
      }
    } else {
      if (this.motion >= this.sleepThreshold) {
        this.awake();
      }
    }

    if (!this.velocity.isZero) {
      this.velocity.scale(Math.max(0, 1 - this.drag * deltaTimeInSecond));
      const velocity = this.velocity.clone().scale(deltaTimeInSecond);
      this.transform.position.add(velocity);
      velocity.destroy();
    }

    if (this.freezeRotation) {
      this.angularVelocity = 0;
    } else {
      if (Math.abs(this.angularVelocity) > 1e-6) {
        this.angularVelocity *= Math.max(0, 1 - this.angularDrag * deltaTimeInSecond);

        if (this.angularVelocity > this.maxAngularVelocity) {
          this.angularVelocity = this.maxAngularVelocity;
        }

        this.transform.rotation += this.angularVelocity * deltaTimeInSecond;

        this.transform.rotation = this.transform.rotation % DoublePI;
      }
    }
  }

  public reset(): void {
    super.reset();
    this.angularDrag = 0;
    this.angularVelocity = 0;
    this.drag = 0;
    this.freezeRotation = false;
    this.mass = 1;
    this.maxAngularVelocity = Infinity;
    this.velocity = Vector.Get();
    this.useGravity = false;
    this.mass = 1;
    this.moi = 5000;
    this.isSleeping = false;
    this.sleepThreshold = 0.2;
    this.sleepTimer = 0;
    this.forces = [
      Vector.Get(),
      Vector.Get(),
      Vector.Get(),
      Vector.Get()
    ];
    this.torques = [0, 0, 0, 0];
  }

  public destroy(): void {
    super.destroy();
    this.velocity.destroy();
    this.forces.forEach(force => force.destroy());
  }
}
