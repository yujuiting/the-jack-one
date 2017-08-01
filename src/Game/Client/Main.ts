import { Subscription } from 'rxjs/Subscription';

import { instantiate,
         getService,
         bootstrap } from 'Engine/Base/runtime';
import { Engine } from 'Engine/Base/Engine';
import { GameObject } from 'Engine/Base/GameObject';
import { Camera, MainCamera } from 'Engine/Base/Camera';
import { SceneManager } from 'Engine/Base/SceneManager';
import { Scene } from 'Engine/Base/Scene';
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
import { Time } from 'Engine/Time/Time';

const mainScene = instantiate(Scene);
(<SceneManager>getService(SceneManager)).add(mainScene);

class MyRect extends GameObject {

  private rigidbody: RigidbodyComponent;

  private collider: BoxColliderComponent;

  constructor(@Inject(Time) private time: Time) {
    super();
    this.rigidbody = this.addComponent(RigidbodyComponent);
    this.collider = this.addComponent(BoxColliderComponent);
    this.collider.size.setTo(100, 100);
    this.collider.debug = true;
  }

  public update() {
    super.update();
    this.transform.rotation += this.time.deltaTime / 6000;
  }

}

const myRect = instantiate(MyRect);
mainScene.add(myRect);

bootstrap(document.body);
