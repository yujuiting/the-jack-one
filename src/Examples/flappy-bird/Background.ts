// tslint:disable max-classes-per-file
import { Class } from 'Engine/Decorator/Class';
import { GameObject } from 'Engine/Core/GameObject';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { Sprite } from 'Engine/Display/Sprite';

import { texture_sky, texture_ground } from './resource';
import { instantiate } from 'Engine/runtime';
import { Inject } from 'Engine/Decorator/Inject';
import { Screen } from 'Engine/Display/Screen';
import { Time } from 'Engine/Time/Time';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';

@Class()
export class Background extends GameObject {

  private sky: Sky;

  private grounds: Ground[];

  @Inject(Screen)
  private screen: Screen;

  @Inject(Time)
  private time: Time;

  public isMoving = false;

  public start(): void {
    super.start();
    this.sky = instantiate(Sky);
    this.addChild(this.sky);

    this.grounds = [];
    for (let i = 0; i < 4; i++) {
      const ground = instantiate(Ground);
      this.grounds.push(ground);
      ground.transform.position.setTo(
        (i - 1) * 336,
        50 - this.screen.height / 2
      );
      this.addChild(ground);
    }
  }

  public fixedUpdate(): void {
    super.update();

    if (!this.isMoving) {
      return;
    }

    const outOfScreen = (-this.screen.width - 336) / 2;

    /**
     * Infinity ground movement
     */
    this.grounds.forEach(ground => {
      ground.transform.localPosition.x -= 10 * this.time.fixedDeltaTimeInSecond;
      if (ground.transform.localPosition.x < outOfScreen) {
        ground.transform.localPosition.x += 336 * 4;
      }
    });
  }

}

@Class()
class Sky extends GameObject {

  private renderer: SpriteRendererComponent;

  public reset(): void {
    super.reset();
    this.renderer = this.addComponent(SpriteRendererComponent);
  }

  public start(): void {
    super.start();
    this.renderer.sprite = new Sprite(texture_sky);
    this.transform.localScale.setTo(3);
  }

}

@Class()
class Ground extends GameObject {

  private renderer: SpriteRendererComponent;

  private collider: BoxColliderComponent;

  public start(): void {
    super.start();
    this.renderer = this.addComponent(SpriteRendererComponent);
    this.renderer.sprite = new Sprite(texture_ground);

    this.collider = this.addComponent(BoxColliderComponent);
    this.collider.size.setTo(336, 112);
  }

}
