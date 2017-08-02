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

@UniqueComponent()
@RequireComponent([TransformComponent])
export class RigidbodyComponent extends Component {

  public angularDrag: number;

  /**
   * angle per second
   */
  public angularVelocity: number;

  public drag: number;

  public freezeRotation: boolean;

  /**
   * In kilogram
   */
  public mass: number = 1;

  /**
   * TODO: update after set mass
   */
  public inverseMass: number = 1;

  public maxAngularVelocity: number;

  /**
   * pixel per second
   */
  public velocity: Vector;

  public useGravity: boolean;

  private forces: Vector[];

  private transform: TransformComponent = <TransformComponent>this.getComponent(TransformComponent);

  constructor(host: GameObject,
              @Inject(Engine) private engine: Engine,
              @Inject(Time) private time: Time) {
    super(host);
  }

  public addForce(force: Vector, forceMode: ForceMode = ForceMode.Force): void {
    this.forces[forceMode].add(force);
  }

  public clearForce(): void {
    this.forces.forEach(force => force.reset());
  }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);

    const deltaTimeInSecond = this.time.fixedDeltaTimeInSecond * alpha;

    if (this.useGravity) {
      this.addForce(this.engine.gravity, ForceMode.Acceleration);
    }

    /**
     * Force
     * f = ma = m∆v/∆t
     * ∆tf = m∆v
     * ∆v = ∆tf/m
     */
    this.forces[ForceMode.Force].scale(deltaTimeInSecond / this.mass);
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
    this.forces[ForceMode.Impulse].scale(1 / this.mass);
    this.velocity.add(this.forces[ForceMode.Impulse]);
    this.forces[ForceMode.Impulse].reset();

    /**
     * VelocityChange without delta time and mass.
     */
    this.velocity.add(this.forces[ForceMode.VelocityChange]);
    this.forces[ForceMode.VelocityChange].reset();

    if (!this.velocity.isZero) {
      this.velocity.scale(Math.max(0, 1 - this.drag * deltaTimeInSecond));
      const velocity = this.velocity.clone();
      velocity.scale(deltaTimeInSecond);
      this.transform.position.add(velocity);
      velocity.destroy();
    }

    if (this.angularVelocity > 1e-6) {
      this.angularVelocity *= Math.max(0, 1 - this.angularDrag * deltaTimeInSecond);
      this.transform.rotation += this.angularVelocity * deltaTimeInSecond;
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
    this.forces = [
      Vector.Get(),
      Vector.Get(),
      Vector.Get(),
      Vector.Get()
    ];
  }

  public destroy(): void {
    super.destroy();
    this.velocity.destroy();
    this.forces.forEach(force => force.destroy());
  }
}
