import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Component } from 'Engine/Core/Component';
import { GameObject } from 'Engine/Core/GameObject';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Bounds } from 'Engine/Display/Bounds';
import { RequireComponent } from 'Engine/Decorator/RequireComponent';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Camera } from 'Engine/Core/Camera';
import { Vector } from 'Engine/Math/Vector';
import { Inject } from 'Engine/Decorator/Inject';

/**
 * Base renderer
 */
@RequireComponent([TransformComponent])
export class RendererComponent extends Component {

  public transform: TransformComponent;

  /**
   * renderer bounds in world coordinate.
   */
  public bounds: Bounds = new Bounds();

  public canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D;

  private _onBecameVisible$: Subject<Camera> = new Subject();

  private _onBecameInvisible$: Subject<Camera> = new Subject();

  get onBecameVisible$(): Observable<Camera> { return this._onBecameVisible$.asObservable(); }

  get onBecameInvisible$(): Observable<Camera> { return this._onBecameInvisible$.asObservable(); }

  constructor(host: GameObject,
              @Inject(BrowserDelegate) browserDelegate: BrowserDelegate) {
    super(host);
    this.canvas = browserDelegate.createCanvas();
    this.ctx = browserDelegate.getContext(this.canvas);
  }

  public start(): void {
    super.start();
    this.transform = <TransformComponent>this.getComponent(TransformComponent);
  }

  public preRender(): void {
    super.preRender();
    this.calculateBounds();
  }

  public render(): void { return; }

  public onBecameVisible(camera: Camera): void {
    this._onBecameVisible$.next(camera);
  }

  public onBecameInvisible(camera: Camera): void {
    this._onBecameInvisible$.next(camera);
  }

  public destroy(): void {
    super.destroy();
    this._onBecameVisible$.complete();
    this._onBecameInvisible$.complete();
  }

  /**
   * Recalculate bounds through canvas size. Called before render.
   */
  protected calculateBounds(): void {
    // TODO: handle rotation in math way
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    const e = Vector.Get(this.canvas.width * 0.5, this.canvas.height * 0.5);
    const c = this.transform.position;
    const s = this.transform.scale;
    Vector.Put(e);
    [
      Vector.Get(e.x, e.y),
      Vector.Get(-e.x, e.y),
      Vector.Get(-e.x, -e.y),
      Vector.Get(e.x, -e.y)
    ].forEach(p => {
      p.multiply(s.x, s.y);
      // perform y-axis up rotation.
      p.rotate(-this.transform.rotation);
      p.add(c);
      if (p.x < minX) {
        minX = p.x;
      }

      if (p.x > maxX) {
        maxX = p.x;
      }

      if (p.y < minY) {
        minY = p.y;
      }

      if (p.y > maxY) {
        maxY = p.y;
      }
      Vector.Put(p);
    });
    this.bounds.reset(minX, minY, maxX, maxY);
  }

}
