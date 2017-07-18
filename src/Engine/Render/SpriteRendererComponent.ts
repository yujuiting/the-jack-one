import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';
import { Matrix2D } from 'Engine/Math/Matrix2D';

@UniqueComponent()
export class SpriteRendererComponent extends RendererComponent {

  public sprite: Sprite|null;

  public render(ctx: CanvasRenderingContext2D, toViewportMatrix: Matrix2D): void {
    if (!this.sprite) {
      return;
    }

    const drawAt = this.transform.position.clone();
    toViewportMatrix.multiplyToPoint(drawAt);
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
