import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';

@UniqueComponent()
export class SpriteRendererComponent extends RendererComponent {

  /**
   * The sprite to render.
   */
  private _sprite: Sprite|undefined;

  /**
   * Only re-render if is dirty.
   */
  private _isDirty = false;

  get sprite(): Sprite|undefined { return this._sprite; }

  set sprite(value: Sprite|undefined) {
    this._isDirty = true;
    this._sprite = value;
  }

  get isDirty(): boolean { return this._isDirty; }

  public update(): void {
    super.update();
    if (this._sprite) {
      const { width, height } = this._sprite;
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  public render(): void {
    if (!this._sprite) {
      return;
    }

    if (!this._isDirty) {
      return;
    }

    const ctx = this.ctx;

    const { width, height } = this.canvas;

    ctx.clearRect(0, 0, width, height);

    ctx.save();

    ctx.drawImage(this._sprite.canvas, 0, 0);

    ctx.restore();
  }

}
