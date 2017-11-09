import { Recyclable } from 'Engine/Utility/Pool';

/**
 * BaseObject provide basic life cycle in game loop.
 * DO NOT inherit from BaseObject directly, descendants of BaseObject will not be updated.
 */
export abstract class BaseObject implements Recyclable {

  private static NextId = 0;

  public readonly id: number;

  /**
   * Identity for human
   */
  public name: string;

  protected _isActive: boolean;

  // When constructing, set _destroyed to true to avoid calling destroy in reset.
  protected _destroyed: boolean = true;

  protected _hasStarted: boolean;

  public get isActive(): boolean { return this._isActive; }

  public get canRecycle(): boolean { return this._destroyed; }

  public get isDestroyed(): boolean { return this._destroyed; }

  public get hasStarted(): boolean { return this._hasStarted; }

  constructor() {
    this.id = BaseObject.NextId++;
    this.reset();
  }

  /**
   * Reset will be called when base object constructing.
   * Use it for constructing instanted of constructor.
   * It will destroy this object if necessary.
   */
  public reset(): void {
    if (!this._destroyed) {
      this.destroy();
    }
    this.name = '';
    this._isActive = false;
    this._destroyed = false;
    this._hasStarted = false;
  }

  /**
   * When object initialized, all components and injections are ready.
   */
  public start(): void {
    this.activate();
    this._hasStarted = true;
  }

  /**
   * This object should not be access anymore after destroyed.
   * Release all resource here.
   */
  public destroy(): void {
    this._destroyed = true;
    this._isActive = false;
  }

  public activate(): void {
    this._isActive = true;
  }

  public deactivate(): void {
    this._isActive = false;
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

  public preRender(): void { return; }

  /**
   * Called after rendered.
   */
  public postRender(): void { return; }

  public abstract toString(): string;

}
