import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';
import { Matrix } from 'Engine/Math/Matrix';

@UniqueComponent()
export class SpriteRendererComponent extends RendererComponent {

  public sprite: Sprite|null;

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {
    if (!this.sprite) {
      return;
    }

    const drawAt = this.transform.position.clone();
    toScreenMatrix.multiplyToPoint(drawAt);
    drawAt.subtract(
      this.sprite.pivot.x * this.transform.width,
      this.sprite.pivot.y * this.transform.height
    );

    ctx.drawImage(
      this.sprite.imageBitmap,
      this.sprite.rect.position.x,
      this.sprite.rect.position.y,
      this.sprite.rect.width,
      this.sprite.rect.height,
      drawAt.x,
      drawAt.y,
      this.transform.width,
      this.transform.height
    );

    drawAt.destroy();
  }

}
