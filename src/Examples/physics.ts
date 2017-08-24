// tslint:disable max-classes-per-file
import 'Engine/imports';
import { Type } from 'Engine/Utility/Type';
import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';
import { Scene } from 'Engine/Base/Scene';
import { SceneManager } from 'Engine/Base/SceneManager';
import { Texture } from 'Engine/Resource/Texture';
import { Sprite } from 'Engine/Display/Sprite';
import { Color } from 'Engine/Display/Color';
import { Vector } from 'Engine/Math/Vector';
import { Random } from 'Engine/Math/Random';
import { GameObject } from 'Engine/Base/GameObject';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';
import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { PointerInput, PointerEvent } from 'Engine/Input/PointerInput';
import { instantiate, bootstrap } from 'Engine/Base/runtime';

const rectTexture = new Texture('../Assets/rect.png');
const circleTexture = new Texture('../Assets/circle.png');

@Class()
class Shape extends GameObject {

  protected renderer: SpriteRendererComponent;

  protected body: RigidbodyComponent;

  @Inject(Random)
  protected random: Random;

  protected size: number;

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

  private outline: LineRendererComponent;

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
    // this.collider.debug = true;
  }

}

@Class()
class Circle extends Shape {

  private outline: CircleRendererComponent;

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
    // this.collider.debug = true;
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
class Game {

  private scene: Scene;

  private shapes: Type<Shape>[] = [
    Box,
    Circle
  ];

  constructor(sceneManager: SceneManager,
              pointerInput: PointerInput,
              private random: Random) {
    // create scene
    this.scene = instantiate(Scene);
    sceneManager.add(this.scene);

    // setup background color
    this.scene.mainCamera.backgroundColor = Color.CreateByHexRgb('#4A687F');

    // prepare resource
    this.scene.resources.add(rectTexture);
    this.scene.resources.add(circleTexture);

    // walls
    const top = instantiate(Wall);
    const bottom = instantiate(Wall);
    const right = instantiate(Wall);
    const left = instantiate(Wall);
    top.transform.position.setTo(0, 200);
    bottom.transform.position.setTo(0, -200);
    right.transform.position.setTo(300, 0);
    right.transform.rotation = Math.PI / 2;
    left.transform.position.setTo(-300, 0);
    left.transform.rotation = Math.PI / 2;
    this.scene.add(top);
    this.scene.add(bottom);
    this.scene.add(right);
    this.scene.add(left);

    // this.scene.add(instantiate(Box));
    // this.scene.add(instantiate(Circle));

    pointerInput.pointerStart$.subscribe(e => this.onPointerStart(e));
  }

  private onPointerStart(e: PointerEvent): void {
    e.locations.forEach(location => {
      const worldPosition = this.scene.mainCamera.screenToWorld(location);
      this.createShapeAt(worldPosition);
    });
  }

  private createShapeAt(position: Vector): void {
    const type = this.random.pickOne(this.shapes);
    const shape = instantiate(type);
    this.scene.add(shape, position);
  }

}

instantiate(Game);

bootstrap();
