import { Recyclable } from 'Engine/Utility/Pool';

/**
 * BaseObject provide basic life cycle in game loop.
 * DO NOT inherit from BaseObject, descendants of BaseObject will not be updated.
 */
export abstract class BaseObject implements Recyclable {

  public readonly id: number;

  /**
   * Identity for human
   */
  public name: string = '';

  protected _isActive: boolean = false;

  protected _destroyed: boolean;

  public get isActive(): boolean { return this._isActive; }

  public get canRecycle(): boolean { return this._destroyed; }

  public get isDestroyed(): boolean { return this._destroyed; }

  protected hasStarted: boolean = false;

  public activate(): void {
    this._isActive = true;
  }

  public deactivate(): void {
    this._isActive = false;
  }

  public reset(): void {
    this._destroyed = false;
    this._isActive = true;
  }

  /**
   * When object initialized, all components are ready.
   */
  public start(): void {
    this.activate();
    this.hasStarted = true;
  }

  /**
   * Guarantee update with 60 times per second.
   * In common case, alpha is always 1.
   */
  public fixedUpdate(alpha: number): void { return; }

  /**
   * Update per frame.
   */
  public update(): void { return; }

  /**
   * Guarantee called after all object updated.
   */
  public lateUpdate(): void { return; }

  /**
   * Called after rendered.
   */
  public postRender(): void { return; }

  /**
   * This object should not be access anymore after destroyed.
   */
  public destroy(): void {
    this._destroyed = true;
    this._isActive = false;
  }

  public abstract toString(): string;

}
