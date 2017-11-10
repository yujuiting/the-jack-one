import { Resource } from 'Engine/Resource/Resource';
import { onceEvent } from 'Engine/Utility/DOM';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Inject } from 'Engine/Decorator/Inject';

/**
 * Basic texture
 */
export class Texture extends Resource<HTMLCanvasElement> {

  @Inject(BrowserDelegate)
  private browser: BrowserDelegate;

  private isDirty: boolean = false;

  private source: HTMLImageElement;

  private _width = 0;

  private _height = 0;

  public get width(): number { return this._width; }

  public set width(value: number) {
    this._width = value;
    this.markAsDirty();
  }

  public get height(): number { return this._height; }

  public set height(value: number) {
    this._height = value;
    this.markAsDirty();
  }

  constructor(path: string) {
    super(path);
  }

  public async load(): Promise<void> {
    if (this.isLoaded) {
      return;
    }

    return new Promise<void>(resolve => {
      const request = new Image();
      request.src = this.path;
      request.onprogress = this.onprogress;
      request.onerror = this.onerror;
      request.onloadstart = this.onloadstart;
      request.onload = () => {
        this._data = this.processData(request);
        this._isLoaded = true;
        this.onLoad.next();
        resolve();
      };
    });
  }

  public clone(): Texture {
    const texture = new Texture(this.path);
    texture.source = this.source;
    texture._width = this._width;
    texture._height = this._height;
    texture._isLoaded = this._isLoaded;
    return texture;
  }

  public markAsDirty(): void {
    if (this.isDirty) {
      return;
    }

    this.isDirty = true;

    if (!this.isLoaded) {
      return;
    }

    // setTimeout(() => this.draw());
    this.processData(this.source);
  }

  protected processData(image: HTMLImageElement): HTMLCanvasElement {
    const data = this.data || this.browser.createCanvas();
    const ctx = <CanvasRenderingContext2D>data.getContext('2d');

    if (this.width === 0 && this.height === 0) {
      data.width = this._width = image.width;
      data.height = this._height = image.height;
    }

    ctx.drawImage(
      image,
      0, 0,
      image.width,
      image.height,
      0, 0,
      this._width,
      this._height
    );

    this.isDirty = false;

    this.source = image;

    return data;
  }

}
