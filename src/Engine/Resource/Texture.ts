import { Resource } from 'Engine/Resource/Resource';
import { onceEvent } from 'Engine/Utility/DOM';

/**
 * Basic texture
 */
export class Texture implements Resource {

  public readonly source: HTMLImageElement;

  private _isLoaded: boolean = false;

  public get isLoaded(): boolean { return this._isLoaded; }

  public get width(): number { return this.source.width; }

  public get height(): number { return this.source.height; }

  constructor(public readonly path: string) {
    this.source = new Image();
    this.source.src = path;
  }

  public load(): Promise<void> {
    if (this._isLoaded) {
      return Promise.resolve();
    }

    return onceEvent(this.source, 'load').then(e => {
      this._isLoaded = true;
    });
  }

}
