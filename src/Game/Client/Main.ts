// tslint:disable max-classes-per-file
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
import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { Inject } from 'Engine/Utility/Decorator/Inject';
import { Time } from 'Engine/Time/Time';
import { ForceMode } from 'Engine/Physics/ForceMode';

const mainScene = instantiate(Scene);
(<SceneManager>getService(SceneManager)).add(mainScene);

class Plane extends GameObject {

  constructor() {
    super();
    const collider = this.addComponent(BoxColliderComponent);
    collider.debug = true;
    collider.size.setTo(500, 10);
  }

}

class Base extends GameObject {

  public rigidbody: RigidbodyComponent;

  @Inject(Time)
  protected time: Time;

  constructor() {
    super();
    this.rigidbody = this.addComponent(RigidbodyComponent);
  }

  public setPosition(x: number, y: number): void {
    this.transform.position.setTo(x, y);
  }

  // public update(): void {
  //   super.update();
  //   console.log(`${this.rigidbody.motion}`);
  // }

}

class Box extends Base {

  public collider: BoxColliderComponent;

  constructor() {
    super();
    this.collider = this.addComponent(BoxColliderComponent);
    this.collider.debug = true;
    this.setSize(20, 20);
    this.rigidbody.useGravity = true;
  }

  public setSize(width: number, height: number): void {
    this.collider.size.setTo(width, height);
  }

  // public fixedUpdate(alpha: number): void {
  //   super.fixedUpdate(alpha);
  //   this.transform.rotation += alpha / 1000;
  // }

}

class Polygon extends Base {

  public collider: PolygonColliderComponent;

  private moveUp: boolean = false;
  private moveDown: boolean = false;
  private moveRight: boolean = false;
  private moveLeft: boolean = false;

  constructor(@Inject(KeyboardInput) input: KeyboardInput) {
    super();
    this.collider = this.addComponent(PolygonColliderComponent);
    this.collider.debug = true;
    this.collider.points.push(
      new Vector(0, 0),
      new Vector(30, 20),
      new Vector(40, 40),
      new Vector(-10, 50),
      new Vector(-20, 30)
    );
    this.collider.isKinematic = true;
    // this.collider.offset.copy(
    //   this.collider.points
    //     .reduce((result, curr) => result.add(curr), new Vector())
    //     .scale(-1 / this.collider.points.length)
    // );

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

class Circle extends Base {

  public collider: CircleColliderComponent;

  // private moveUp: boolean = false;
  // private moveDown: boolean = false;
  // private moveRight: boolean = false;
  // private moveLeft: boolean = false;

  constructor(@Inject(KeyboardInput) input: KeyboardInput) {
    super();
    this.collider = this.addComponent(CircleColliderComponent);
    this.collider.debug = true;
    this.collider.radius = 20;
    this.rigidbody.mass = 20;
    this.rigidbody.useGravity = true;

    // input.keyDown$.filter(e => e.key === 'a').subscribe(() => this.moveLeft = true);
    // input.keyUp$.filter(e => e.key === 'a').subscribe(() => this.moveLeft = false);

    // input.keyDown$.filter(e => e.key === 'd').subscribe(() => this.moveRight = true);
    // input.keyUp$.filter(e => e.key === 'd').subscribe(() => this.moveRight = false);

    // input.keyDown$.filter(e => e.key === 'w').subscribe(() => this.moveUp = true);
    // input.keyUp$.filter(e => e.key === 'w').subscribe(() => this.moveUp = false);

    // input.keyDown$.filter(e => e.key === 's').subscribe(() => this.moveDown = true);
    // input.keyUp$.filter(e => e.key === 's').subscribe(() => this.moveDown = false);
  }

  // public update(): void {
  //   super.update();

  //   this.rigidbody.velocity.reset();

  //   if (this.moveDown) {
  //     this.rigidbody.addForce(new Vector(0, -100), ForceMode.Impulse);
  //   }

  //   if (this.moveLeft) {
  //     this.rigidbody.addForce(new Vector(-100, 0), ForceMode.Impulse);
  //   }

  //   if (this.moveRight) {
  //     this.rigidbody.addForce(new Vector(100, 0), ForceMode.Impulse);
  //   }

  //   if (this.moveUp) {
  //     this.rigidbody.addForce(new Vector(0, 100), ForceMode.Impulse);
  //   }
  // }

  public fixedUpdate(alpha: number): void {
    super.fixedUpdate(alpha);
    this.transform.rotation += alpha / 1000;
  }

}

for (let i = 0; i < 1; i++) {
  for (let j = 0; j < 1; j++) {
    const box = instantiate(Box);
    box.setPosition(i * 30, j * 30);
    mainScene.add(box);
  }
}

// for (let i = 0; i < 2; i++) {
//   for (let j = 0; j < 2; j++) {
//     const circle = instantiate(Circle);
//     circle.setPosition(i * 80 + 200, j * 80);
//     mainScene.add(circle);
//   }
// }
// const circle = instantiate(Circle);
// circle.setPosition(-200, 0);
// mainScene.add(circle);

const polygon = instantiate(Polygon);
polygon.setPosition(0, 100);
mainScene.add(polygon);

const plane1 = instantiate(Plane);
plane1.transform.position.setTo(100, -160);
// plane1.transform.rotation = Math.PI / 18;
mainScene.add(plane1);

const plane2 = instantiate(Plane);
plane2.transform.position.setTo(-100, -160);
// plane2.transform.rotation = -Math.PI / 18;
mainScene.add(plane2);

bootstrap(document.body);
