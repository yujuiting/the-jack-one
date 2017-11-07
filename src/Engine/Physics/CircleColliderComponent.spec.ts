// tslint:disable member-access no-unused-expression
import 'Engine/preset';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Vector } from 'Engine/Math/Vector';
import { CircleColliderComponent } from 'Engine/Physics/CircleColliderComponent';
import { GameObject } from 'Engine/Core/GameObject';
import { instantiate, getService } from 'Engine/runtime';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';
import { Line } from 'Engine/Math/Line';
import { Ray } from 'Engine/Math/Ray';

@suite class CircleColliderComponentTestSuite {

  gameObject: GameObject;
  collider: CircleColliderComponent;

  before() {
    this.gameObject = instantiate(GameObject);
    this.collider = this.gameObject.addComponent(CircleColliderComponent);
    this.collider.radius = 10;

    const initializer = <GameObjectInitializer>getService(GameObjectInitializer);
    initializer.resolve();

    this.gameObject.fixedUpdate();
  }

  @test 'should calculate bounds' () {
    const bounds = this.collider.bounds;

    expect(bounds.min.x).to.equal(-10);
    expect(bounds.min.y).to.equal(-10);

    expect(bounds.max.x).to.equal(10);
    expect(bounds.max.y).to.equal(10);
  }

  @test 'contains: should check whether contains point' () {
    const p1 = new Vector(3, -4);
    const p2 = new Vector(16, 4);

    expect(this.collider.contains(p1)).to.be.true;
    expect(this.collider.contains(p2)).to.be.false;
  }

  @test 'rayCast: should return intersection point if ray cast hit' () {
    const ray = new Ray();
    ray.origin.setTo(-20, -20);
    ray.direction.setTo(1, 1).normalize();

    const p = this.collider.rayCast(ray);

    expect(p).not.to.be.undefined;
    expect((<Vector>p).x).to.closeTo(-7.071068, 1e-6);
    expect((<Vector>p).y).to.closeTo(-7.071068, 1e-6);
  }

  @test 'project: should return projection' () {
    const a1 = new Vector(1, 1).normalize();
    const p1 = this.collider.project(a1);

    expect(p1.min).to.closeTo(-10, 1e-6);
    expect(p1.max).to.closeTo(10, 1e-6);
  }

  @test 'getFurthestPoint: should return furthest point' () {
    const direction = new Vector(3, 4);
    const p = this.collider.getFurthestPoint(direction);

    expect(p.x).to.closeTo(6, 1e-6);
    expect(p.y).to.closeTo(8, 1e-6);
  }

}
