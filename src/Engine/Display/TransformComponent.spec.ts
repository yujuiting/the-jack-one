// tslint:disable member-access no-unused-expression
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { instantiate, getService } from 'Engine/Base/runtime';
import { GameObjectInitializer } from 'Engine/Base/GameObjectInitializer';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { GameObject } from 'Engine/Base/GameObject';
import { Vector } from 'Engine/Math/Vector';

@suite class TransformComponentTestSuite {

  transform: TransformComponent;

  before() {
    const gameObject: GameObject = instantiate(GameObject);
    const initializer = <GameObjectInitializer>getService(GameObjectInitializer);
    initializer.resolve();
    this.transform = gameObject.transform;
  }

  @test 'should calculate toWorldMatrix' () {
    this.transform.position.setTo(10, 20);
    this.transform.rotation = Math.PI / 2;
    this.transform.scale.setTo(1, 2);
    this.transform.calculate();

    const p = new Vector(5, 10);
    this.transform.toWorldMatrix.multiplyToPoint(p);

    expect(p.x).to.closeTo(-10, 1e-6);
    expect(p.y).to.closeTo(25, 1e-6);
  }

  @test 'should calculate toLocalMatrix' () {
    this.transform.position.setTo(10, 20);
    this.transform.rotation = Math.PI / 2;
    this.transform.scale.setTo(1, 2);
    this.transform.calculate();

    const p = new Vector(5, 10);
    this.transform.toLocalMatrix.multiplyToPoint(p);

    expect(p.x).to.closeTo(-10, 1e-6);
    expect(p.y).to.closeTo(2.5, 1e-6);
  }

}
