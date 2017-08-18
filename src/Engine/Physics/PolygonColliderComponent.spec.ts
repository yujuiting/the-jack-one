// tslint:disable member-access no-unused-expression
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Vector } from 'Engine/Math/Vector';
import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';
import { GameObject } from 'Engine/Base/GameObject';
import { instantiate, getService } from 'Engine/Base/runtime';
import { GameObjectInitializer } from 'Engine/Base/GameObjectInitializer';
import { Line } from 'Engine/Math/Line';
import { Ray } from 'Engine/Math/Ray';

@suite class PolygonColliderComponentTestSuite {

  gameObject: GameObject;
  collider: PolygonColliderComponent;

  before() {
    this.gameObject = instantiate(GameObject);
    this.collider = this.gameObject.addComponent(PolygonColliderComponent);
    this.collider.points.push(
      new Vector(0, 0),
      new Vector(3, 2),
      new Vector(4, 4),
      new Vector(-1, 5),
      new Vector(-2, 3)
    );

    const initializer = <GameObjectInitializer>getService(GameObjectInitializer);
    initializer.resolve();

    this.gameObject.start();
    this.gameObject.fixedUpdate();
  }

  @test 'should calculate points' () {
    let points: ReadonlyArray<Vector> = this.collider.cachedPoints;

    expect(points.length).to.equal(5);

    expect(points[0].x).to.equal(0);
    expect(points[0].y).to.equal(0);

    expect(points[1].x).to.equal(3);
    expect(points[1].y).to.equal(2);

    expect(points[2].x).to.equal(4);
    expect(points[2].y).to.equal(4);

    expect(points[3].x).to.equal(-1);
    expect(points[3].y).to.equal(5);

    expect(points[4].x).to.equal(-2);
    expect(points[4].y).to.equal(3);

    // rotate 45 degree clockwise
    this.gameObject.transform.rotation = Math.PI / 4;
    this.gameObject.fixedUpdate();

    points = this.collider.cachedPoints;

    expect(points[0].x).to.closeTo(0, 1e-6);
    expect(points[0].y).to.closeTo(0, 1e-6);

    expect(points[1].x).to.closeTo(0.707107, 1e-6);
    expect(points[1].y).to.closeTo(3.535534, 1e-6);

    expect(points[2].x).to.closeTo(0, 1e-6);
    expect(points[2].y).to.closeTo(5.656854, 1e-6);

    expect(points[3].x).to.closeTo(-4.242641, 1e-6);
    expect(points[3].y).to.closeTo(2.828427, 1e-6);

    expect(points[4].x).to.closeTo(-3.535534, 1e-6);
    expect(points[4].y).to.closeTo(0.707107, 1e-6);
  }

  @test 'should calculate sides' () {
    const sides: ReadonlyArray<Line> = this.collider.cachedSides;

    expect(sides.length).to.equal(5);

    expect(sides[0].begin.x).to.equal(0);
    expect(sides[0].begin.y).to.equal(0);
    expect(sides[0].end.x).to.equal(3);
    expect(sides[0].end.y).to.equal(2);

    expect(sides[1].begin.x).to.equal(3);
    expect(sides[1].begin.y).to.equal(2);
    expect(sides[1].end.x).to.equal(4);
    expect(sides[1].end.y).to.equal(4);

    expect(sides[2].begin.x).to.equal(4);
    expect(sides[2].begin.y).to.equal(4);
    expect(sides[2].end.x).to.equal(-1);
    expect(sides[2].end.y).to.equal(5);

    expect(sides[3].begin.x).to.equal(-1);
    expect(sides[3].begin.y).to.equal(5);
    expect(sides[3].end.x).to.equal(-2);
    expect(sides[3].end.y).to.equal(3);

    expect(sides[4].begin.x).to.equal(-2);
    expect(sides[4].begin.y).to.equal(3);
    expect(sides[4].end.x).to.equal(0);
    expect(sides[4].end.y).to.equal(0);
  }

  @test 'should calculate bounds' () {
    const bounds = this.collider.bounds;

    expect(bounds.min.x).to.equal(-2);
    expect(bounds.min.y).to.equal(0);

    expect(bounds.max.x).to.equal(4);
    expect(bounds.max.y).to.equal(5);

    // rotate 45 degree clockwise
    this.gameObject.transform.rotation = Math.PI / 4;
    this.gameObject.fixedUpdate();

    expect(bounds.min.x).to.closeTo(-4.242640, 1e-6);
    expect(bounds.min.y).to.closeTo(0, 1e-6);

    expect(bounds.max.x).to.closeTo(0.707107, 1e-6);
    expect(bounds.max.y).to.closeTo(5.656854, 1e-6);
  }

  @test 'contains: should check whether contains point' () {
    const p1 = new Vector(3, 3);
    const p2 = new Vector(6, 4);

    expect(this.collider.contains(p1)).to.be.true;
    expect(this.collider.contains(p2)).to.be.false;
  }

  @test 'rayCast: should return intersection point if ray cast hit' () {
    const ray = new Ray();
    ray.origin.setTo(-10, 4);
    ray.direction.setTo(1, 0);

    const p = this.collider.rayCast(ray);

    expect(p).not.to.be.undefined;
    expect((<Vector>p).x).to.equal(-1.5);
    expect((<Vector>p).y).to.equal(4);
  }

  @test 'project: should return projection' () {
    const a1 = new Vector(10, 3).normalize();
    const p1 = this.collider.project(a1);

    expect(p1.min).to.closeTo(-1.053609, 1e-6);
    expect(p1.max).to.closeTo(4.980696, 1e-6);
  }

  @test 'getFurthestPoint: should return furthest point' () {
    const direction = new Vector(1, 2);
    const p = this.collider.getFurthestPoint(direction);

    expect(p.x).to.equal(4);
    expect(p.y).to.equal(4);
  }

}
