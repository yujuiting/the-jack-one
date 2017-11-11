import { Class } from 'Engine/Decorator/Class';
import { GameObject } from 'Engine/Core/GameObject';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { texture_splash } from './resource';

@Class()
export class Splash extends GameObject {

  private renderer: SpriteRendererComponent;

  public reset(): void {
    super.reset();
    this.name = 'splash';
    this.renderer = this.addComponent(SpriteRendererComponent);
    this.renderer.sprite = new Sprite(texture_splash);
    this.transform.scale.setTo(1.5);
  }

}
