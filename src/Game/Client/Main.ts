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
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { Inject } from 'Engine/Utility/Decorator/Inject';
import { Time } from 'Engine/Time/Time';
import { ForceMode } from 'Engine/Physics/ForceMode';

const mainScene = instantiate(Scene);
(<SceneManager>getService(SceneManager)).add(mainScene);

class Base extends GameObject {

  public rigidbody: RigidbodyComponent;

  constructor() {
    super();
    this.rigidbody = this.addComponent(RigidbodyComponent);
  }

  public setPosition(x: number, y: number): void {
    this.transform.position.setTo(x, y);
  }

}

class Box extends Base {

  public collider: BoxColliderComponent;

  constructor() {
    super();
    this.collider = this.addComponent(BoxColliderComponent);
    this.collider.debug = true;
    this.setSize(20, 20);
  }

  public setSize(width: number, height: number): void {
    this.collider.size.setTo(width, height);
  }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);
    this.transform.rotation += alpha / 1000;
  }

}

class Circle extends Base {

  public collider: CircleColliderComponent;

  private moveUp: boolean = false;
  private moveDown: boolean = false;
  private moveRight: boolean = false;
  private moveLeft: boolean = false;

  constructor(@Inject(KeyboardInput) input: KeyboardInput) {
    super();
    this.collider = this.addComponent(CircleColliderComponent);
    this.collider.debug = true;
    this.collider.radius = 20;

    input.keyDown$.filter(e => e.key === 'a').subscribe(() => this.moveLeft = true);
    input.keyUp$.filter(e => e.key === 'a').subscribe(() => this.moveLeft = false);

    input.keyDown$.filter(e => e.key === 'd').subscribe(() => this.moveRight = true);
    input.keyUp$.filter(e => e.key === 'd').subscribe(() => this.moveRight = false);

    input.keyDown$.filter(e => e.key === 'w').subscribe(() => this.moveUp = true);
    input.keyUp$.filter(e => e.key === 'w').subscribe(() => this.moveUp = false);

    input.keyDown$.filter(e => e.key === 's').subscribe(() => this.moveDown = true);
    input.keyUp$.filter(e => e.key === 's').subscribe(() => this.moveDown = false);
  }

  public update(): void {
    super.update();

    this.rigidbody.velocity.reset();

    if (this.moveDown) {
      this.rigidbody.addForce(new Vector(0, -100), ForceMode.Impulse);
    }

    if (this.moveLeft) {
      this.rigidbody.addForce(new Vector(-100, 0), ForceMode.Impulse);
    }

    if (this.moveRight) {
      this.rigidbody.addForce(new Vector(100, 0), ForceMode.Impulse);
    }

    if (this.moveUp) {
      this.rigidbody.addForce(new Vector(0, 100), ForceMode.Impulse);
    }
  }

}

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const box = instantiate(Box);
    box.setPosition(i * 25, j * 25);
    mainScene.add(box);
  }
}

const circle = instantiate(Circle);
circle.setPosition(50, -50);
mainScene.add(circle);

bootstrap(document.body);
