// tslint:disable max-classes-per-file no-stateless-class
import 'Engine/preset';

import { instantiate, bootstrap, def, DEBUG } from 'Engine/runtime';
def(DEBUG);

import { GameObject } from 'Engine/Core/GameObject';
import { Scene } from 'Engine/Core/Scene';
// import { Screen } from 'Engine/Display/Screen';
import { SceneManager } from 'Engine/Core/SceneManager';
import { Class } from 'Engine/Decorator/Class';
// import { TextRendererComponent } from 'Engine/Render/TextRendererComponent';
import { KeyboardInput } from 'Engine/Input/KeyboardInput';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { SpriteSheetRendererComponent } from 'Engine/Render/SpriteSheetRendererComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { SpriteSheet } from 'Engine/Display/SpriteSheet';
import { Texture } from 'Engine/Resource/Texture';
import { Inject } from 'Engine/Decorator/Inject';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';

@Class()
class Subject extends GameObject {
  // public renderer = this.addComponent(TextRendererComponent);
  // public renderer = this.addComponent(SpriteRendererComponent);
  // public renderer = this.addComponent(SpriteSheetRendererComponent);
  public renderer = this.addComponent(LineRendererComponent);
}

@Class()
class World {

  constructor(@Inject(SceneManager) sceneManager: SceneManager,
              @Inject(KeyboardInput) keyboardInput: KeyboardInput) {
    const scene = instantiate(Scene);
    sceneManager.add(scene);

    // const texture = new Texture('/Assets/rect.png');
    const texture = new Texture('/Assets/flappy-bird/bird.png');
    const sprite = new Sprite(texture);
    sprite.rect.position.setTo(0, 0);
    sprite.rect.width = 210;
    sprite.rect.height = 200;
    const spritesheet = new SpriteSheet(
      texture,
      [
        { x:   0, y: 0, width: 210, height: 200 },
        { x: 210, y: 0, width: 210, height: 200 },
        { x: 420, y: 0, width: 210, height: 200 }
      ],
      6
    );

    scene.resources.add(texture);

    const subject = instantiate(Subject);
    // subject.renderer.text = 'Hello Engine';
    // subject.renderer.sprite = sprite;
    // subject.renderer.spriteSheet = spritesheet;
    // subject.renderer.sprite = <Sprite>spritesheet.getSprite('default', 0);
    // subject.transform.scale.setTo(1.4, 1);
    subject.renderer.addPoint(
      new Vector(100, 100),
      new Vector(100, -100),
      new Vector(-100, -100),
      new Vector(-100, 100)
    );
    subject.renderer.closePath = true;
    subject.renderer.strokeColor = Color.Blue;
    subject.transform.position.setTo(100, 0);
    scene.add(subject);

    const onKeyDown$ = keyboardInput.keyDown$.map(e => e.key);
    onKeyDown$.filter(code => code === 'w').subscribe(() => subject.transform.position.y += 10);
    onKeyDown$.filter(code => code === 's').subscribe(() => subject.transform.position.y -= 10);
    onKeyDown$.filter(code => code === 'd').subscribe(() => subject.transform.position.x += 10);
    onKeyDown$.filter(code => code === 'a').subscribe(() => subject.transform.position.x -= 10);
    onKeyDown$.filter(code => code === 'q').subscribe(() => subject.transform.rotation += Math.PI / 6);
    onKeyDown$.filter(code => code === 'e').subscribe(() => subject.transform.rotation -= Math.PI / 6);
    onKeyDown$.filter(code => code === 'c').subscribe(() => subject.transform.scale.add(0.1));
    onKeyDown$.filter(code => code === 'z').subscribe(() => subject.transform.scale.add(-0.1));
  }

}

instantiate(World);

bootstrap().catch(console.error);
