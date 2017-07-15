import { Subscription } from 'rxjs/Subscription';
import { engine,
         sceneManager,
         GameObject,
         Scene } from 'Engine';
import { Texture } from 'Engine/Resource/Texture';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { SpriteSheetRendererComponent } from 'Engine/Render/SpriteSheetRendererComponent';
import { KeyboardInput } from 'Engine/Input/KeyboardInput';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { Vector } from 'Engine/Math/Vector';
import { TransformComponent } from 'Engine/Display/TransformComponent';

const texture = new Texture('Assets/jake.idle.png');
const spriteSheet = new SpriteSheet(texture, 1000 / 12, {
  idle: {
    width: 83,
    height: 139,
    frameCount: 22
  }
});

class Jake extends GameObject {

  private rigidbody: RigidbodyComponent = this.addComponent(RigidbodyComponent);

  private renderer: SpriteSheetRendererComponent = this.addComponent(SpriteSheetRendererComponent);

  private subscriptions: Subscription[] = [];

  constructor() {
    super();

    this.renderer.setSpriteSheet(spriteSheet, 'idle');

    const keyboardInput = KeyboardInput.Get();

    const keydownSubscription = keyboardInput.keyDown$.subscribe(e =>
      this.onKeydown(e));

    const keyupSubscription = keyboardInput.keyUp$.subscribe(() =>
      this.rigidbody.velocity.setTo(0, 0));

    this.subscriptions.push(keydownSubscription, keyupSubscription);
  }

  public destroy(): void {
    super.destroy();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private onKeydown(e: KeyboardEvent): void {
    if (e.key === 'a') {
      this.rigidbody.velocity.x = -100;
    }
    if (e.key === 'd') {
      this.rigidbody.velocity.x = 100;
    }
    if (e.key === 'w') {
      this.rigidbody.velocity.y = -100;
    }
    if (e.key === 's') {
      this.rigidbody.velocity.y = 100;
    }
    if (e.key === ' ') {
      if (engine.isPaused) {
        engine.resume();
      } else {
        engine.pause();
      }
    }
  }

}

const mainScene = new Scene();
sceneManager.add(mainScene);

mainScene.resources.add(texture);

const jake = new Jake();
mainScene.add(jake);

engine.initialize(document.body);
