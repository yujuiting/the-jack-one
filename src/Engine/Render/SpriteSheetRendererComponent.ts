import { RendererComponent } from 'Engine/Render/RendererComponent';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { Time } from 'Engine/Time/Time';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';
import { Matrix2D } from 'Engine/Math/Matrix2D';

@UniqueComponent()
@RequireComponent([TransformComponent])
export class SpriteSheetRendererComponent extends RendererComponent {

  private spriteSheet: SpriteSheet;

  private sheetKey: string;

  private time: Time = Time.Get();

  private currentIndex: number = 0;

  private sprites: ReadonlyArray<Sprite>;

  private accumulator: number = 0;

  public setSpriteSheet(spriteSheet: SpriteSheet, defaultKey: string): void {
    this.spriteSheet = spriteSheet;
    this.setSpriteSheetKey(defaultKey);
  }

  public setSpriteSheetKey(key: string): void {
    this.currentIndex = 0;
    this.sheetKey = key;
    this.sprites = this.spriteSheet.getSprites(this.sheetKey);
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix2D): void {

    this.accumulator += this.time.deltaTime;

    if (this.accumulator > this.spriteSheet.frameTime) {
      this.accumulator -= this.spriteSheet.frameTime;
      this.currentIndex++;
      if (this.currentIndex >= this.sprites.length) {
        this.currentIndex = 0;
      }
    }

    const sprite = this.sprites[this.currentIndex];

    const drawAt = this.transform.position.clone();
    toScreenMatrix.multiplyToPoint(drawAt);
    drawAt.subtract(
      sprite.pivot.x * this.transform.width,
      sprite.pivot.y * this.transform.height
    );

    ctx.drawImage(
      sprite.imageBitmap,
      sprite.rect.position.x,
      sprite.rect.position.y,
      sprite.rect.width,
      sprite.rect.height,
      drawAt.x,
      drawAt.y,
      this.transform.width,
      this.transform.height
    );

    drawAt.destroy();
  }

}
