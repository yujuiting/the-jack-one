import { Resource } from 'Engine/Resource/Resource';
import { onceEvent } from 'Engine/Utility/DOM';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Inject } from 'Engine/Decorator/Inject';

/**
 * Basic texture
 */
export class Texture extends Resource {

  private source: HTMLImageElement;

  @Inject(BrowserDelegate)
  private browser: BrowserDelegate;

  private canvas: HTMLCanvasElement = this.browser.document.createElement('canvas');

  private ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

  private isDirty: boolean = false;

  public get width(): number { return this.canvas.width; }

  public set width(value: number) {
    this.canvas.width = value;
    this.markAsDirty();
  }

  public get height(): number { return this.canvas.height; }

  public set height(value: number) {
    this.canvas.height = value;
    this.markAsDirty();
  }

  public get imageBitmap(): ImageBitmap|HTMLCanvasElement { return this.canvas; }

  constructor(public readonly path: string,
              imageData?: ImageData) {
    super();
    if (imageData) {
      this.canvas.width = imageData.width;
      this.canvas.height = imageData.height;
      this.setImageData(imageData);
    } else {
      this.canvas.width = 0;
      this.canvas.height = 0;
    }
  }

  public load(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    this.source = new Image();
    this.source.src = this.path;

    return onceEvent(this.source, 'load').then(e => this.draw());
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

  public markAsDirty(): void {
    if (this.isDirty) {
      return;
    }

    this.isDirty = true;

    if (!this.isLoaded) {
      return;
    }

    setTimeout(() => this.draw());
  }

  private draw(): void {
    if (this.width === 0 && this.height === 0) {
      this.canvas.width = this.source.width;
      this.canvas.height = this.source.height;
    }

    this.ctx.drawImage(
      this.source,
      0, 0,
      this.source.width,
      this.source.height,
      0, 0,
      this.width,
      this.height
    );

    this.isDirty = false;
    if (!this.isLoaded) {
      this._isLoaded.next(true);
    }
  }

}
