import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';
import { Matrix } from 'Engine/Math/Matrix';

@UniqueComponent()
export class SpriteRendererComponent extends RendererComponent {

  public sprite: Sprite|null;

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {
    if (!this.sprite) {
      return;
    }

    this.calculateBounds(this.sprite.width, this.sprite.height);

    this.bounds.extents.setTo(
      this.sprite.width * 0.5,
      this.sprite.height * 0.5
    );

    ctx.save();

    const m = toScreenMatrix.clone().multiply(this.transform.toWorldMatrix);

    /**
     * reverse first to correct y-axis and rotate direction
     */
    m.setScaling(-1, -1);

    ctx.transform(
      m[0][0], m[0][1],
      m[1][0], m[1][1],
      m[0][2], m[1][2]
    );

    ctx.drawImage(
      this.sprite.imageBitmap,
      // source rect
      this.sprite.rect.position.x,
      this.sprite.rect.position.y,
      this.sprite.rect.width,
      this.sprite.rect.height,
      // destination rect
      -this.sprite.pivot.x * this.sprite.width,
      -this.sprite.pivot.y * this.sprite.height,
      this.sprite.width,
      this.sprite.height
    );

    ctx.restore();
  }

  private calculateBounds(width: number, height: number): void {
    this.bounds.center.copy(this.transform.position);
    this.bounds.extents.setTo(width * 0.5, height * 0.5);
  }

}
