import { RendererComponent } from 'Engine/Render/RendererComponent';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { Time } from 'Engine/Time/Time';
import { UniqueComponent } from 'Engine/Utility/Decorator/UniqueComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';

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

  public render(ctx: CanvasRenderingContext2D): void {
    // TransformComponent is required.
    // Restriction come from metadata in future.
    const transform = <TransformComponent>this.getComponent(TransformComponent);

    this.accumulator += this.time.deltaTime;

    if (this.accumulator > this.spriteSheet.frameTime) {
      this.accumulator -= this.spriteSheet.frameTime;
      this.currentIndex++;
      if (this.currentIndex >= this.sprites.length) {
        this.currentIndex = 0;
      }
    }

    const sprite = this.sprites[this.currentIndex];

    ctx.drawImage(
      sprite.texture.source,
      sprite.offsetX,
      sprite.offsetY,
      sprite.width,
      sprite.height,
      transform.position.x,
      transform.position.y,
      sprite.width,
      sprite.height
    );
  }

}
