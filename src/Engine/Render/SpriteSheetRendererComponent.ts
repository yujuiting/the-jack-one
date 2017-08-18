import { GameObject } from 'Engine/Base/GameObject';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { Time } from 'Engine/Time/Time';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';
import { RequireComponent } from 'Engine/Decorator/RequireComponent';
import { Matrix } from 'Engine/Math/Matrix';
import { Inject } from 'Engine/Decorator/Inject';

@UniqueComponent()
@RequireComponent([TransformComponent])
export class SpriteSheetRendererComponent extends RendererComponent {

  private spriteSheet: SpriteSheet;

  private sheetKey: string;

  private currentIndex: number = 0;

  private sprites: ReadonlyArray<Sprite>;

  private accumulator: number = 0;

    constructor(host: GameObject,
                private time: Time) {
      super(host);
    }

  public setSpriteSheet(spriteSheet: SpriteSheet, defaultKey: string): void {
    this.spriteSheet = spriteSheet;
    this.setSpriteSheetKey(defaultKey);
  }

  public setSpriteSheetKey(key: string): void {
    this.currentIndex = 0;
    this.sheetKey = key;
    this.sprites = this.spriteSheet.getSprites(this.sheetKey);
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {

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
      sprite.pivot.x * sprite.width,
      sprite.pivot.y * sprite.height
    );

    ctx.drawImage(
      sprite.imageBitmap,
      sprite.rect.position.x,
      sprite.rect.position.y,
      sprite.rect.width,
      sprite.rect.height,
      drawAt.x,
      drawAt.y,
      sprite.width,
      sprite.height
    );

    drawAt.destroy();
  }

}
