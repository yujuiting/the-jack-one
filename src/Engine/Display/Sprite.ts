import { Subscription } from 'rxjs/Subscription';
import { Texture } from 'Engine/Resource/Texture';
import { Vector } from 'Engine/Math/Vector';
import { Rect } from 'Engine/Math/Rect';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Inject } from 'Engine/Decorator/Inject';

export class Sprite {

  /**
   * Pivot value between [0, 1]
   */
  public pivot: Vector = new Vector(0.5, 0.5);

  /**
   * Rect of this sprite.
   */
  public rect: Rect = new Rect();

  /**
   * Which part of texture is used.
   */
  public textureRect: Rect = new Rect();

  @Inject(BrowserDelegate)
  private browser: BrowserDelegate;

  private canvas: HTMLCanvasElement = this.browser.createCanvas();

  private ctx: CanvasRenderingContext2D = this.browser.getContext(this.canvas);

  private _texture: Texture;

  private textureLoaded: Subscription;

  get imageBitmap(): ImageBitmap|HTMLCanvasElement {
    this.update();
    return this.canvas;
  }

  get texture(): Texture { return this._texture; }

  set texture(texture: Texture) { this.setTexture(texture); }

  get width(): number { return this.canvas.width; }

  get height(): number { return this.canvas.height; }

  constructor(texture: Texture) {
    this.setTexture(texture);
  }

  public setTexture(texture: Texture): void {
    this._texture = texture;

    if (this.textureLoaded) {
      this.textureLoaded.unsubscribe();
    }

    this.textureLoaded = texture.isLoaded$.subscribe(() =>
      this.onTextureLoaded());
  }

  private onTextureLoaded(): void {
    if (this.rect.width === 0 && this.rect.height === 0) {
      this.rect.width = this._texture.width;
      this.rect.height = this._texture.height;
      this.canvas.width = this.rect.width;
      this.canvas.height = this.rect.height;
    }

    if (this.textureRect.width === 0 && this.textureRect.height === 0) {
      this.textureRect.width = this._texture.width;
      this.textureRect.height = this._texture.height;
    }
  }

  private update(): void {
    this.canvas.width = this.rect.width;
    this.canvas.height = this.rect.height;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(
      this._texture.imageBitmap,
      this.textureRect.position.x,
      this.textureRect.position.y,
      this.textureRect.width,
      this.textureRect.height,
      this.rect.position.x,
      this.rect.position.y,
      this.rect.width,
      this.rect.height
    );
  }

}
