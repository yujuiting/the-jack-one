import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { Time } from 'Engine/Time/Time';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';
import { Inject } from 'Engine/Decorator/Inject';

@UniqueComponent()
export class SpriteSheetRendererComponent extends SpriteRendererComponent {

  private _spriteSheet: SpriteSheet;

  private sheetKey: string;

  private currentIndex: number = 0;

  private sprites: ReadonlyArray<Sprite>|undefined;

  private accumulator: number = 0;

  get spriteSheet(): SpriteSheet { return this._spriteSheet; }

  set spriteSheet(value: SpriteSheet) { this.setSpriteSheep(value); }

  @Inject(Time)
  private time: Time;

  public play(key = 'default'): void {
    this.currentIndex = 0;
    this.sheetKey = key;
    this.accumulator = 0;
    this.sprites = this._spriteSheet.getSprites(this.sheetKey);
  }

  public update(): void {
    if (!this.sprites) {
      this.sprite = undefined;
      return;
    }

    this.accumulator += this.time.deltaTime;

    if (this.accumulator > this._spriteSheet.frameTime) {
      const times = (this.accumulator / this._spriteSheet.frameTime) | 0;
      this.accumulator %= this._spriteSheet.frameTime;
      this.currentIndex += times;
      if (this.currentIndex >= this.sprites.length) {
        this.currentIndex = 0;
      }
    }

    this.sprite = this.sprites[this.currentIndex];

    // After updated sprite, super call for calculate bounds.
    super.update();
  }

  private setSpriteSheep(spriteSheet: SpriteSheet): void {
    this._spriteSheet = spriteSheet;
    // initialize sprites
    if (!this.sprites) {
      this.play();
    }
  }
}
