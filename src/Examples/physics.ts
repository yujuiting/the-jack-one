// tslint:disable max-classes-per-file
import 'Engine/preset';
import { instantiate, bootstrap, def, DEBUG_PHYSICS } from 'Engine/runtime';
def(DEBUG_PHYSICS);

import { GameObject } from 'Engine/Core/GameObject';
import { Scene } from 'Engine/Core/Scene';
import { Screen } from 'Engine/Display/Screen';
import { SceneManager } from 'Engine/Core/SceneManager';

import { Type } from 'Engine/Utility/Type';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { removeFromArray } from 'Engine/Utility/ArrayUtility';

import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';

import { Texture } from 'Engine/Resource/Texture';

import { Sprite } from 'Engine/Display/Sprite';
import { Color } from 'Engine/Display/Color';

import { Vector } from 'Engine/Math/Vector';
import { Random } from 'Engine/Math/Random';

import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';

import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';

import { PointerInput, PointerEvent } from 'Engine/Input/PointerInput';

const rectTexture = new Texture('../assets/rect.png');
const circleTexture = new Texture('../assets/circle.png');

@Class()
class Shape extends GameObject {

  protected renderer: SpriteRendererComponent;

  protected body: RigidbodyComponent;

  protected size: number;

  @Inject(Random) protected random: Random;

  public isVisible: boolean = true;

  public start(): void {
    super.start();
    this.renderer = this.addComponent(SpriteRendererComponent);
    this.renderer.onBecameVisible$.subscribe(() => this.isVisible = true);
    this.renderer.onBecameInvisible$.subscribe(() => this.isVisible = false);
    this.body = this.addComponent(RigidbodyComponent);
    this.size = this.random.integer(64, 128);
    this.transform.scale.setTo(this.size / 400);
    this.body.useGravity = true;
  }

}

@Class()
class Box extends Shape {

  private collider: BoxColliderComponent;

  public start(): void {
    super.start();
    this.collider = this.addComponent(BoxColliderComponent);
    this.renderer.sprite = new Sprite(rectTexture);
    this.collider.size.setTo(400);
  }

}

@Class()
class Circle extends Shape {

  private collider: CircleColliderComponent;

  public start(): void {
    super.start();
    this.collider = this.addComponent(CircleColliderComponent);
    this.renderer.sprite = new Sprite(circleTexture);
    this.collider.radius = 200;
  }

}

@Class()
class Wall extends GameObject {

  private collider: BoxColliderComponent;

  public start(): void {
     super.start();
     this.collider = this.addComponent(BoxColliderComponent);
     this.collider.size.setTo(3000, 2);
  }

}

@Class()
class GameManager extends GameObject {

  public scene: Scene;

  private shapes: Shape[] = [];

  @Inject(Random)
  protected random: Random;

  public postRender(): void {
    super.postRender();

    const invisibleShapes = this.shapes.filter(shape => shape.isActive && !shape.isVisible);
    invisibleShapes.forEach(invisibleShape => this.destroyShape(invisibleShape));
  }

  public createShapeAt(position: Vector): void {
    const type = this.random.pickOne(ShapeTypes);
    const shape = instantiate(type);
    this.scene.add(shape, position);
    // push after 100ms prevent game object be remove before ready.
    setTimeout(() => this.shapes.push(shape), 100);
  }

  public destroyShape(shape: Shape): void {
    shape.destroy();
    this.scene.remove(shape);
    removeFromArray(this.shapes, shape);
  }

}

const ShapeTypes: Type<Shape>[] = [Box, Circle];

@Class()
class Game {

  private scene: Scene;

  private gameManager: GameManager;

  private wallTop: Wall;
  private wallBottom: Wall;
  private wallRight: Wall;
  private wallLeft: Wall;

  constructor(@Inject(SceneManager) private sceneManager: SceneManager,
              @Inject(PointerInput) private pointerInput: PointerInput,
              @Inject(BrowserDelegate) private browserDelegate: BrowserDelegate,
              @Inject(Screen) private screen: Screen) {
    // create scene
    this.scene = instantiate(Scene);
    this.sceneManager.add(this.scene);

    // setup background color
    this.scene.mainCamera.backgroundColor = Color.CreateByHexRgb('#4A687F');

    // prepare resource
    this.scene.resources.add(rectTexture);
    this.scene.resources.add(circleTexture);

    // walls
    this.wallTop = instantiate(Wall);
    this.scene.add(this.wallTop);

    this.wallBottom = instantiate(Wall);
    this.scene.add(this.wallBottom);

    this.wallRight = instantiate(Wall);
    this.wallRight.transform.rotation = Math.PI / 2;
    this.scene.add(this.wallRight);

    this.wallLeft = instantiate(Wall);
    this.wallLeft.transform.rotation = Math.PI / 2;
    this.scene.add(this.wallLeft);

    this.adjustWalls();

    // game manager
    this.gameManager = instantiate(GameManager);
    this.gameManager.scene = this.scene;
    this.scene.add(this.gameManager);

    // pointer input event
    this.pointerInput.pointerStart$.subscribe(e => this.onPointerStart(e));

    // resize event
    this.browserDelegate.resize$.subscribe(e => this.onResize(e));
  }

  private onPointerStart(e: PointerEvent): void {
    e.locations.forEach(location => {
      const worldPosition = this.scene.mainCamera.screenToWorld(location);
      this.gameManager.createShapeAt(worldPosition);
    });
  }

  private adjustWalls(): void {
    const halfWidth = this.screen.width * 0.5;
    const halfHeight = this.screen.height * 0.5;
    this.wallTop.transform.position.setTo(0, halfHeight);
    this.wallBottom.transform.position.setTo(0, -halfHeight);
    this.wallRight.transform.position.setTo(halfWidth, 0);
    this.wallLeft.transform.position.setTo(-halfWidth, 0);
  }

  private onResize(e: Event): void {
    this.scene.mainCamera.setSize(
      this.screen.width,
      this.screen.height
    );
    this.adjustWalls();
  }

}

instantiate(Game);

bootstrap().catch(console.error);
