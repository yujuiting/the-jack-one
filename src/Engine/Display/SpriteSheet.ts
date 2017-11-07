import { Texture } from 'Engine/Resource/Texture';
import { Sprite } from 'Engine/Display/Sprite';

export interface SpriteSheetCell {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

export type SpriteSheetCells = SpriteSheetCell[];

export interface SpriteSheetCellMap {
  [name: string]: SpriteSheetCells;
}

interface InternalSpriteSheet {
  frameTime: number;
}

export class SpriteSheet {

  private sprites: Map<string, Sprite[]> = new Map();

  public readonly frameTime: number;

  public get fps(): number { return this._fps; }

  public set fps(value: number) {
    this._fps = value;
    (<InternalSpriteSheet>this).frameTime = 1 / value;
  }

  constructor(public texture: Texture,
              private cellMapOrCells: SpriteSheetCellMap|SpriteSheetCells,
              private _fps = 24) {
    if (Array.isArray(cellMapOrCells)) {
      const sprites = this.makeSprites(texture, cellMapOrCells);
      const key = 'default';
      this.sprites.set(key, sprites);
    } else {
      const keys = Object.keys(cellMapOrCells);
      keys.forEach(key => {
        const cells = cellMapOrCells[key];
        const sprites = this.makeSprites(texture, cells);
        this.sprites.set(key, sprites);
      });
    }

    this.frameTime = 1 / _fps;
}

  public getSprites(key: string): ReadonlyArray<Sprite> {
    return this.sprites.get(key) || [];
  }

  public getSprite(key: string, index: number): Sprite|undefined {
    const sprites = this.sprites.get(key);
    if (!sprites) {
      return;
    }

    const correctedIndex = index % sprites.length;

    return sprites[correctedIndex];
  }

  private makeSprites(texture: Texture, cells: SpriteSheetCells): Sprite[] {
    const sprites: Sprite[] = [];
    cells.forEach(cell => {
      const sprite = new Sprite(texture);
      sprite.rect.position.setTo(cell.x || 0, cell.y || 0);
      sprite.rect.width = cell.width;
      sprite.rect.height = cell.height;
      sprites.push(sprite);
    });
    return sprites;
  }

}
