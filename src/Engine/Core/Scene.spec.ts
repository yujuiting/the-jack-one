// tslint:disable member-access no-unused-expression
import 'Engine/preset';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import { suite, test } from 'mocha-typescript';
import { instantiate } from 'Engine/runtime';
import { Scene } from 'Engine/Core/Scene';
import { GameObject } from 'Engine/Core/GameObject';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

@suite class SceneTestSuite {

  scene: Scene;

  before(): void {
    this.scene = instantiate(Scene);
  }

  @test 'add: should add game object' () {
    const g: GameObject = instantiate(GameObject);

    expect(this.scene.add(g)).to.be.true;

    // game object will be hide from object tree until started.
    g.start();

    expect(this.scene.has(g)).to.be.true;
  }

  @test 'remove: should remove game object' () {
    const g: GameObject = instantiate(GameObject);
    this.scene.add(g);

    expect(this.scene.remove(g)).to.be.true;
    expect(this.scene.has(g)).to.be.false;
  }

}
