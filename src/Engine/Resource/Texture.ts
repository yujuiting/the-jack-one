import { Resource } from 'Engine/Resource/Resource';
import { onceEvent } from 'Engine/Utility/DOM';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Inject } from 'Engine/Utility/Decorator/Inject';

/**
 * Basic texture
 */
export class Texture extends Resource {

  private source: HTMLImageElement;

  @Inject(BrowserDelegate)
  private browser: BrowserDelegate;

  private canvas: HTMLCanvasElement = this.browser.document.createElement('canvas');

  private ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

  public get width(): number { return this.canvas.width; }

  public get height(): number { return this.canvas.height; }

  public get imageBitmap(): ImageBitmap|HTMLCanvasElement { return this.canvas; }

  constructor(public readonly path: string,
              imageData?: ImageData) {
    super();
    if (imageData) {
      this.canvas.width = imageData.width;
      this.canvas.height = imageData.height;
      this.setImageData(imageData);
    }
  }

  public load(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    this.source = new Image();
    this.source.src = this.path;
    this.canvas.width = 0;
    this.canvas.height = 0;

    return onceEvent(this.source, 'load').then(e => this.onLoad());
  }

  public getImageData(sx: number = 0,
                      sy: number = 0,
                      sw: number = this.width,
                      sh: number = this.height): ImageData {
    return this.ctx.getImageData(sx, sy, sw, sh);
  }

  public setImageData(imageData: ImageData,
                      dx: number = 0,
                      dy: number = 0,
                      dirtyX: number = 0,
                      dirtyY: number = 0,
                      dirtyWidth: number = imageData.width,
                      dirtyHeight: number = imageData.height): void {
    this.ctx.putImageData(
      imageData,
      dx, dy,
      dirtyX, dirtyY,
      dirtyWidth, dirtyHeight
    );
  }

  public clone(): Texture {
    return new Texture(this.path, this.getImageData());
  }

  private onLoad(): void {
    this.canvas.width = this.source.width;
    this.canvas.height = this.source.height;
    this.ctx.drawImage(
      this.source,
      0, 0,
      this.source.width,
      this.source.height
    );
    this._isLoaded.next(true);
  }

}
