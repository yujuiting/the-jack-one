// tslint:disable max-classes-per-file
import 'Engine/preset';

import { GameObject } from 'Engine/Core/GameObject';
import { Component } from 'Engine/Core/Component';
import { Scene } from 'Engine/Core/Scene';
import { SceneManager } from 'Engine/Core/SceneManager';
import { Screen } from 'Engine/Display/Screen';
import { Camera } from 'Engine/Core/Camera';
import { instantiate, bootstrap } from 'Engine/runtime';

// import { Time } from 'Engine/Time/Time';

import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';

import { Sprite } from 'Engine/Display/Sprite';
import { Color } from 'Engine/Display/Color';
import { Bounds } from 'Engine/Display/Bounds';

import { Texture } from 'Engine/Resource/Texture';

import { Vector } from 'Engine/Math/Vector';

import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { TextRendererComponent } from 'Engine/Render/TextRendererComponent';

import { PointerInput, PointerEvent } from 'Engine/Input/PointerInput';

import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';

const texture: Texture = new Texture('../assets/circle.png');

@Class()
class Player extends GameObject {

  private renderer: SpriteRendererComponent;

  private body: RigidbodyComponent;

  private destination: Vector = new Vector();

  private moveSpeed: number = 100;

  private isMoving: boolean = false;

  public start(): void {
    super.start();

    const sprite = new Sprite(texture);
    this.transform.scale.setTo(0.25);

    this.renderer = this.addComponent(SpriteRendererComponent);
    this.renderer.sprite = sprite;

    this.body = this.addComponent(RigidbodyComponent);
  }

  public move(destination: Vector): void {
    this.isMoving = true;
    this.destination.copy(destination);
    this.body.velocity
      .copy(destination)
      // dest - pos = relative
      .subtract(this.transform.position)
      .normalize()
      .multiply(this.moveSpeed);
  }

  public stopMove(): void {
    this.isMoving = false;
    this.body.velocity.reset();
  }

  public update(): void {
    super.update();

    if (this.isMoving) {
      if (this.transform.position.distanceTo(this.destination) < 10) {
        this.stopMove();
      }
    }
  }

}

@Class()
class Box extends GameObject {

  private size: number = 300;

  public start(): void {
    super.start();

    const outline = this.addComponent(LineRendererComponent);

    const halfSize = this.size / 2;

    outline.addPoint(
      new Vector(halfSize, halfSize),
      new Vector(halfSize, -halfSize),
      new Vector(-halfSize, -halfSize),
      new Vector(-halfSize, halfSize)
    );

    outline.closePath = true;

    outline.strokeColor = Color.White;
  }

}

@Class()
class Label extends GameObject {

  private renderer: TextRendererComponent;

  public text: string = '';

  public start(): void {
    super.start();
    this.renderer = this.addComponent(TextRendererComponent);
    this.renderer.text = this.text;
  }

}

@Class()
class CameraFollow extends Component {

  public bounds: Bounds = new Bounds();

  private target: GameObject|null;

  private isFollowing: boolean = false;

  private relative: Vector = new Vector();

  public follow(target: GameObject|null) : void { this.target = target; }

  public update(): void {
    if (!this.target) {
      return;
    }

    const cameraPosition = this.host.transform.position;
    const targetPosition = this.target.transform.position;

    this.bounds.center.copy(cameraPosition);

    if (this.isFollowing) {
      cameraPosition.copy(targetPosition).add(this.relative);
      if (this.bounds.containPoint(targetPosition)) {
        this.isFollowing = false;
      }
    } else {
      if (!this.bounds.containPoint(targetPosition)) {
        this.isFollowing = true;
        this.relative.copy(cameraPosition).subtract(targetPosition);
      }
    }
  }

}

@Class()
class Game {

  private player: Player = instantiate(Player);

  private scene: Scene = instantiate(Scene);

  private mainCamera: Camera = this.scene.mainCamera;

  private subCamera: Camera = instantiate(Camera);

  constructor(@Inject(SceneManager) sceneManager: SceneManager,
              @Inject(PointerInput) pointerInput: PointerInput,
              @Inject(Screen) private screen: Screen) {
    this.scene.resources.add(texture);
    this.scene.add(this.player);
    this.scene.add(this.subCamera);
    this.scene.add(instantiate(Box));
    sceneManager.add(this.scene);

    this.mainCamera.backgroundColor = Color.CreateByHexRgb('#4A687F');
    const cameraFollow = this.mainCamera.addComponent(CameraFollow);
    cameraFollow.bounds.extents.setTo(50, 50);
    cameraFollow.follow(this.player);

    const halfScreenWidth = screen.width * 0.5;

    // split screen
    this.mainCamera.setSize(halfScreenWidth, screen.height);
    this.subCamera.setSize(halfScreenWidth, screen.height);
    this.subCamera.rect.position.setTo(halfScreenWidth, 0);

    pointerInput.pointerStart$.subscribe(e => this.onPointerStart(e));

    const mainCameraLabel: Label = instantiate(Label);
    mainCameraLabel.text = 'Main Camera, click to move';
    mainCameraLabel.layer = 1 << 10;
    this.scene.add(mainCameraLabel);
    this.mainCamera.cullingMask = this.mainCamera.cullingMask | mainCameraLabel.layer;

    const subCameraLabel: Label = instantiate(Label);
    subCameraLabel.text = 'Sub Camera';
    subCameraLabel.layer = 1 << 11;
    this.scene.add(subCameraLabel);
    this.subCamera.cullingMask = this.subCamera.cullingMask | subCameraLabel.layer;
  }

  private onPointerStart(e: PointerEvent): void {
    const location = e.locations[0];
    const halfScreenWidth = this.screen.width * 0.5;
    if (location.x > halfScreenWidth) {
      // do not handle sub camera
      return;
    }
    const worldPosition = this.mainCamera.screenToWorld(location);
    this.player.move(worldPosition);
  }

}

instantiate(Game);

bootstrap().catch(console.error);
