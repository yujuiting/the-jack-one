import { Texture } from 'Engine/Resource/Texture';
import { Vector } from 'Engine/Math/Vector';
import { Sprite } from 'Engine/Display/Sprite';

interface SpriteSheetCell {
  offsetX?: number;
  offsetY?: number;
  width: number;
  height: number;
  frameCount: number;
}

interface SpriteSheetCellMap {
  [name: string]: SpriteSheetCell;
}

export class SpriteSheet {

  private sprites: Map<string, Sprite[]> = new Map();

  constructor(public texture: Texture,
              public frameTime: number,
              private cellMap: SpriteSheetCellMap = {}) {
    const keys = Object.keys(cellMap);
    keys.forEach(key => {
      const cell = cellMap[key];
      const sprites: Sprite[] = [];
      for (let i = 0; i < cell.frameCount; i++) {
        const sprite = new Sprite(texture);
        sprite.textureRect.position.setTo(
          (cell.offsetX || 0) + cell.width * i, cell.offsetY || 0);
        sprite.textureRect.width = sprite.rect.width = cell.width;
        sprite.textureRect.height = sprite.rect.height = cell.height;
        sprites.push(sprite);
      }
      this.sprites.set(key, sprites);
    });
  }

  public getSprites(key: string): ReadonlyArray<Sprite> {
    return this.sprites.get(key) || [];
  }

  public getSprite(key: string, index: number): Sprite {
    const cell = this.cellMap[key];
    const correctedIndex = index % cell.frameCount;

    return (<Sprite[]>this.sprites.get(key))[correctedIndex];
  }

}
