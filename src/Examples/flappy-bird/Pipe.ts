import { Class } from 'Engine/Decorator/Class';
import { GameObject } from 'Engine/Core/GameObject';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { Sprite } from 'Engine/Display/Sprite';

import { texture_pipe } from './resource';
import { instantiate } from 'Engine/runtime';
import { Observable } from 'rxjs/Observable';
import { Camera } from 'Engine/Core/Camera';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';

@Class()
class PipeObject extends GameObject {

  public renderer: SpriteRendererComponent;

  public collider: BoxColliderComponent;

  public reset(): void {
    super.reset();
    this.renderer = this.addComponent(SpriteRendererComponent);
    this.collider = this.addComponent(BoxColliderComponent);
  }

  public start(): void {
    super.start();
    this.renderer.sprite = new Sprite(texture_pipe);
    this.collider.size.setTo(138, 1000);
  }

}

@Class()
export class Pipe extends GameObject {

  private upper: PipeObject;

  private lower: PipeObject;

  private body: RigidbodyComponent;

  get onBecameInvisible$(): Observable<Camera> { return this.upper.renderer.onBecameInvisible$; }

  public scored: boolean;

  public reset(): void {
    super.reset();
    this.upper = instantiate(PipeObject);
    this.lower = instantiate(PipeObject);
    this.body = this.addComponent(RigidbodyComponent);
    this.scored = false;
  }

  public start(): void {
    super.start();
    this.upper.transform.localScale.setTo(1, -1);
    this.upper.transform.position.setTo(0, 325);
    this.lower.transform.position.setTo(0, -325);

    this.addChild(this.upper);
    this.addChild(this.lower);

    this.transform.scale.setTo(0.5);
  }

  public startMove(): void {
    this.body.velocity.setTo(-120, 0);
  }

  public stopMove(): void {
    this.body.velocity.reset();
  }

}
