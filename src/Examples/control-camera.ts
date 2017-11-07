// tslint:disable max-classes-per-file
import 'Engine/preset';

import { GameObject } from 'Engine/Core/GameObject';
import { Component } from 'Engine/Core/Component';
import { Scene } from 'Engine/Core/Scene';
import { SceneManager } from 'Engine/Core/SceneManager';
import { Camera } from 'Engine/Core/Camera';
import { instantiate, bootstrap } from 'Engine/runtime';

import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';

import { Texture } from 'Engine/Resource/Texture';

import { Sprite } from 'Engine/Display/Sprite';
import { Color } from 'Engine/Display/Color';

import { Vector } from 'Engine/Math/Vector';

import { TextRendererComponent } from 'Engine/Render/TextRendererComponent';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';

import { RigidbodyComponent } from 'Engine/Physics/RigidbodyComponent';

import { KeyboardInput } from 'Engine/Input/KeyboardInput';

const texture: Texture = new Texture('../Assets/circle.png');

@Class()
class CameraController extends Component {

  @Inject(KeyboardInput)
  private keyboardInput: KeyboardInput;

  private body: RigidbodyComponent;

  private description: TextRendererComponent;
  private outline: LineRendererComponent;

  private isMovingUp: boolean = false;
  private isMovingDown: boolean = false;
  private isMovingRight: boolean = false;
  private isMovingLeft: boolean = false;

  public speed: number = 100;

  public start(): void {
    this.body = this.addComponent(RigidbodyComponent);

    this.description = this.addComponent(TextRendererComponent);
    this.description.text = '← ↑ → ↓';
    this.description.fillColor = Color.White;

    this.outline = this.addComponent(LineRendererComponent);
    this.outline.addPoint(
      new Vector(100, 100),
      new Vector(100, -100),
      new Vector(-100, -100),
      new Vector(-100, 100)
    );
    this.outline.closePath = true;
    this.outline.strokeColor = Color.White;

    const keyDown$ = this.keyboardInput.keyDown$.map(e => e.key);
    const keyUp$ = this.keyboardInput.keyUp$.map(e => e.key);

    keyDown$.filter(key => key === 'ArrowUp').subscribe(() => this.isMovingUp = true);
    keyUp$.filter(key => key === 'ArrowUp').subscribe(() => this.isMovingUp = false);

    keyDown$.filter(key => key === 'ArrowDown').subscribe(() => this.isMovingDown = true);
    keyUp$.filter(key => key === 'ArrowDown').subscribe(() => this.isMovingDown = false);

    keyDown$.filter(key => key === 'ArrowRight').subscribe(() => this.isMovingRight = true);
    keyUp$.filter(key => key === 'ArrowRight').subscribe(() => this.isMovingRight = false);

    keyDown$.filter(key => key === 'ArrowLeft').subscribe(() => this.isMovingLeft = true);
    keyUp$.filter(key => key === 'ArrowLeft').subscribe(() => this.isMovingLeft = false);
  }

  public update(): void {
    this.body.velocity.reset();

    if (this.isMovingUp) {
      this.body.velocity.add(0, this.speed);
    }

    if (this.isMovingDown) {
      this.body.velocity.add(0, -this.speed);
    }

    if (this.isMovingRight) {
      this.body.velocity.add(this.speed, 0);
    }

    if (this.isMovingLeft) {
      this.body.velocity.add(-this.speed, 0);
    }

    this.body.velocity.normalize().multiply(this.speed);
  }

}

@Class()
class Jack extends GameObject {

  private renderer: SpriteRendererComponent;

  public start(): void {
    super.start();

    const sprite = new Sprite(texture);
    this.transform.scale.setTo(0.25);

    this.renderer = this.addComponent(SpriteRendererComponent);
    this.renderer.sprite = sprite;
  }

}

@Class()
class Game {

  private scene: Scene = instantiate(Scene);

  private camera: Camera = this.scene.mainCamera;

  constructor(@Inject(SceneManager) sceneManager: SceneManager) {
    this.scene.resources.add(texture);

    sceneManager.add(this.scene);

    this.camera.backgroundColor = Color.CreateByHexRgb('#4A687F');
    this.camera.addComponent(CameraController);

    this.scene.add(instantiate(Jack));
  }

}

instantiate(Game);

bootstrap().catch(console.error);
