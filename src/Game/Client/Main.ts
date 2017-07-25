import { Subscription } from 'rxjs/Subscription';
import { GameObject,
         Scene,
         Camera,
         Engine } from 'Engine';
import { SceneManager } from 'Engine/Base/SceneManager';
import { Texture } from 'Engine/Resource/Texture';
import { Sprite } from 'Engine/Display/Sprite';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { SpriteSheetRendererComponent } from 'Engine/Render/SpriteSheetRendererComponent';
import { KeyboardInput } from 'Engine/Input/KeyboardInput';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { Vector } from 'Engine/Math/Vector';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { Inject } from 'Engine/Utility/Decorator/Inject';
import { providerRegistry } from 'Engine/Utility/ProviderRegistry';

const texture = new Texture('Assets/jack.idle.png');
const spriteSheet = new SpriteSheet(texture, 1000 / 12, {
  idle: {
    width: 83,
    height: 139,
    frameCount: 22
  }
});
// const texture2 = new Texture('Assets/image.jpg');
// const sprite = new Sprite(texture2);

class Jack extends GameObject {

  private rigidbody: RigidbodyComponent = this.addComponent(RigidbodyComponent);

  private renderer: SpriteSheetRendererComponent = this.addComponent(SpriteSheetRendererComponent);
  // private renderer: SpriteRendererComponent = this.addComponent(SpriteRendererComponent);

  private subscriptions: Subscription[] = [];

  @Inject(KeyboardInput)
  private keyboardInput: KeyboardInput;

  @Inject(Engine)
  private engine: Engine;

  constructor() {
    super();

    this.transform.width = 83;
    this.transform.height = 139;
    this.transform.position.setTo(0, 0);

    this.renderer.setSpriteSheet(spriteSheet, 'idle');
    // this.renderer.sprite = sprite;

    const boxCollider = this.addComponent(BoxColliderComponent);
    boxCollider.bounds.extents.setTo(40, 70);
    boxCollider.debug = true;

    const keydownSubscription = this.keyboardInput.keyDown$.subscribe(e =>
      this.onKeydown(e));

    const keyupSubscription = this.keyboardInput.keyUp$.subscribe(() =>
      this.rigidbody.velocity.setTo(0, 0));

    this.subscriptions.push(keydownSubscription, keyupSubscription);
  }

  public destroy(): void {
    super.destroy();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private onKeydown(e: KeyboardEvent): void {
    const camera = Camera.MainCamera;

    if (e.key === 'a') {
      // this.rigidbody.velocity.x = -100;
      camera.transform.position.x += -10;
    }
    if (e.key === 'd') {
      // this.rigidbody.velocity.x = 100;
      camera.transform.position.x += 10;
    }
    if (e.key === 'w') {
      // this.rigidbody.velocity.y = 100;
      camera.transform.position.y += 10;
    }
    if (e.key === 's') {
      // this.rigidbody.velocity.y = -100;
      camera.transform.position.y += -10;
    }
    if (e.key === ' ') {
      if (this.engine.isPaused) {
        this.engine.resume();
      } else {
        this.engine.pause();
      }
    }
  }

}

const mainScene = new Scene();
providerRegistry.get<SceneManager>(SceneManager).add(mainScene);

mainScene.resources.add(texture);
// mainScene.resources.add(texture2);

providerRegistry.get<Engine>(Engine).initialize(document.body);

const jack = new Jack();
mainScene.add(jack);
