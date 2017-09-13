// tslint:disable max-classes-per-file
import 'Engine/imports';

import { GameObject } from 'Engine/Base/GameObject';
import { Scene } from 'Engine/Base/Scene';
import { Screen } from 'Engine/Base/Screen';
import { SceneManager } from 'Engine/Base/SceneManager';
import { instantiate, bootstrap } from 'Engine/Base/runtime';

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

const rectTexture = new Texture('../Assets/rect.png');
const circleTexture = new Texture('../Assets/circle.png');

@Class()
class Shape extends GameObject {

  protected renderer: SpriteRendererComponent;

  protected outline: LineRendererComponent | CircleRendererComponent;

  protected body: RigidbodyComponent;

  @Inject(Random)
  protected random: Random;

  protected size: number;

  public get isVisible(): boolean { return this.outline && this.outline.isVisible; }

  public start(): void {
    super.start();
    this.renderer = this.addComponent(SpriteRendererComponent);
    this.body = this.addComponent(RigidbodyComponent);
    this.size = this.random.integer(32, 128);
    this.body.useGravity = true;
  }

}

@Class()
class Box extends Shape {

  private collider: BoxColliderComponent;

  public start(): void {
    super.start();
    this.outline = this.addComponent(LineRendererComponent);
    this.collider = this.addComponent(BoxColliderComponent);

    this.renderer.sprite = new Sprite(rectTexture);

    const halfSize = this.size / 2;

    this.renderer.sprite.rect.width = this.size;
    this.renderer.sprite.rect.height = this.size;

    this.outline.addPoint(
      new Vector(halfSize, halfSize),
      new Vector(halfSize, -halfSize),
      new Vector(-halfSize, -halfSize),
      new Vector(-halfSize, halfSize)
    );

    this.outline.closePath = true;
    this.outline.strokeColor = Color.CreateByHexRgb('#94CFFF');

    this.collider.size.setTo(this.size, this.size);
  }

}

@Class()
class Circle extends Shape {

  private collider: CircleColliderComponent;

  public start(): void {
    super.start();
    this.outline = this.addComponent(CircleRendererComponent);
    this.collider = this.addComponent(CircleColliderComponent);

    this.renderer.sprite = new Sprite(circleTexture);

    const halfSize = this.size / 2;

    this.renderer.sprite.rect.width = this.size;
    this.renderer.sprite.rect.height = this.size;

    this.outline.radius = halfSize;
    this.outline.strokeColor = Color.CreateByHexRgb('#94CFFF');

    this.collider.radius = halfSize;
  }

}

@Class()
class Wall extends GameObject {

  private collider: BoxColliderComponent;

  public start(): void {
     super.start();
     this.collider = this.addComponent(BoxColliderComponent);

     this.collider.size.setTo(3000, 2);
     this.collider.debug = true;
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

  constructor(private sceneManager: SceneManager,
              private pointerInput: PointerInput,
              private browserDelegate: BrowserDelegate,
              private screen: Screen) {
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

bootstrap();
