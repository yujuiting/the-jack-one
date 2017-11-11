import { GameObject } from 'Engine/Core/GameObject';
import { Class } from 'Engine/Decorator//Class';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { CircleColliderComponent } from 'Engine/Physics//CircleColliderComponent';
import { Vector } from 'Engine/Math/Vector';
import { SpriteSheetRendererComponent } from 'Engine/Render/SpriteSheetRendererComponent';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { ForceMode } from 'Engine/Physics/ForceMode';
import { Observable } from 'rxjs/Observable';
import { AudioPlayerComponent } from 'Engine/Media/AudioPlayerComponent';
import { Inject } from 'Engine/Decorator/Inject';
import { Screen } from 'Engine/Display/Screen';

import { texture_bird, sfx_wing, sfx_hit } from './resource';

@Class()
export class Bird extends GameObject {

  public static readonly FlyVelocity = new Vector(0, 350);

  public static readonly Gravity = new Vector(0, -1200);

  private body: RigidbodyComponent;

  private collider: CircleColliderComponent;

  private renderer: SpriteSheetRendererComponent;

  private sfxWing: AudioPlayerComponent;

  private sfxHit: AudioPlayerComponent;

  public isFalling: boolean;

  public get onCollide$(): Observable<any> { return this.collider.onCollide$; }

  @Inject(Screen)
  private screen: Screen;

  public reset(): void {
    super.reset();
    this.body = this.addComponent(RigidbodyComponent);
    this.collider = this.addComponent(CircleColliderComponent);
    this.renderer = this.addComponent(SpriteSheetRendererComponent);
    this.sfxWing = this.addComponent(AudioPlayerComponent);
    this.sfxWing.source = sfx_wing;
    this.sfxHit = this.addComponent(AudioPlayerComponent);
    this.sfxHit.source = sfx_hit;
    this.isFalling = false;
  }

  public fixedUpdate(): void {
    super.fixedUpdate();

    const top = this.screen.height * 0.5 - 40;

    if (this.transform.position.y >= top) {
      this.transform.position.y = top;
    }
  }

  public start(): void {
    super.start();

    this.collider.radius = 60;

    this.renderer.spriteSheet = new SpriteSheet(
      texture_bird,
      [
        { x:   0, y: 0, width: 210, height: 200 },
        { x: 210, y: 0, width: 210, height: 200 },
        { x: 420, y: 0, width: 210, height: 200 }
      ],
      6
    );

    this.transform.scale.setTo(0.25);
  }

  public update(): void {
    super.update();
    if (this.isFalling) {
      this.body.addForce(Bird.Gravity, ForceMode.Acceleration);
    } else {
      this.body.velocity.reset();
    }

    this.transform.rotation = this.body.velocity.y / 4000 * Math.PI;
  }

  public fly(): void {
    this.body.velocity.reset();
    this.body.addForce(Bird.FlyVelocity, ForceMode.VelocityChange);
    if (this.sfxWing.isPlaying) {
      this.sfxWing.stop();
    }
    this.sfxWing.play();
  }

  public die(): void {
    this.sfxHit.play();
    this.body.clearForce();
  }

}
