import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';

@UniqueComponent()
export class SpriteRendererComponent extends RendererComponent {

  /**
   * The sprite to render.
   */
  public sprite: Sprite|undefined;

  public update(): void {
    super.update();
    if (this.sprite) {
      const { width, height } = this.sprite;
      // const scale = this.transform.scale;
      // const width = sourceWidth * scale.x;
      // const height = sourceHeight * scale.y;
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  public render(): void {
    if (!this.sprite) {
      return;
    }

    const ctx = this.ctx;

    const { width, height } = this.canvas;

    ctx.clearRect(0, 0, width, height);

    ctx.save();

    ctx.drawImage(this.sprite.canvas, 0, 0);

    ctx.restore();
  }

}
