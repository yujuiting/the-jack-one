import { Texture } from 'Engine/Resource/Texture';

export class Sprite {

  constructor(public texture: Texture,
              public offsetX: number = 0,
              public offsetY: number = 0,
              public width: number,
              public height: number) {}

}
