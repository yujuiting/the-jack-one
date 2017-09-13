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

    this.calculateBounds(sprite.width, sprite.height);

    this.bounds.extents.setTo(
      sprite.width * 0.5,
      sprite.height * 0.5
    );

    const m = toScreenMatrix.clone().multiply(this.transform.toWorldMatrix);

    /**
     * reverse first to correct y-axis and rotate direction
     */
    m.setScaling(-1, -1);

    ctx.save();

    ctx.transform(
      m[0][0], m[0][1],
      m[1][0], m[1][1],
      m[0][2], m[1][2]
    );

    ctx.drawImage(
      sprite.imageBitmap,
      sprite.rect.position.x,
      sprite.rect.position.y,
      sprite.rect.width,
      sprite.rect.height,
      -sprite.pivot.x * sprite.width,
      -sprite.pivot.y * sprite.height,
      sprite.width,
      sprite.height
    );

    ctx.restore();
  }

  private calculateBounds(width: number, height: number): void {
    this.bounds.center.copy(this.transform.position);
    this.bounds.extents.setTo(width * 0.5, height * 0.5);
  }

}
