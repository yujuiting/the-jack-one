// tslint:disable member-access no-unused-expression
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Vector } from 'Engine/Math/Vector';
import { BoxColliderComponent } from 'Engine/Physics/BoxColliderComponent';
import { GameObject } from 'Engine/Base/GameObject';
import { Line } from 'Engine/Math/Line';
import { Ray } from 'Engine/Math/Ray';

@suite class BoxColliderComponentTestSuite {

  gameObject: GameObject;
  collider: BoxColliderComponent;

  before() {
    this.gameObject = new GameObject();
    this.collider = this.gameObject.addComponent(BoxColliderComponent);
    this.collider.size.setTo(10, 10);
    this.gameObject.start();
    this.gameObject.fixedUpdate();
  }

  @test 'should calculate points' () {
    let points: ReadonlyArray<Vector> = this.collider.points;

    expect(points.length).to.equal(4);

    expect(points[0].x).to.equal(-5);
    expect(points[0].y).to.equal(-5);

    expect(points[1].x).to.equal(5);
    expect(points[1].y).to.equal(-5);

    expect(points[2].x).to.equal(5);
    expect(points[2].y).to.equal(5);

    expect(points[3].x).to.equal(-5);
    expect(points[3].y).to.equal(5);

    // rotate 45 degree clockwise
    this.gameObject.transform.rotation = Math.PI / 4;
    this.gameObject.fixedUpdate();

    points = this.collider.points;

    expect(points[0].x).to.closeTo(0, 1e-6);
    expect(points[0].y).to.closeTo(-7.071068, 1e-6);

    expect(points[1].x).to.closeTo(7.071068, 1e-6);
    expect(points[1].y).to.closeTo(0, 1e-6);

    expect(points[2].x).to.closeTo(0, 1e-6);
    expect(points[2].y).to.closeTo(7.071068, 1e-6);

    expect(points[3].x).to.closeTo(-7.071068, 1e-6);
    expect(points[3].y).to.closeTo(0, 1e-6);
  }

  @test 'should calculate sides' () {
    const sides: ReadonlyArray<Line> = this.collider.sides;

    expect(sides.length).to.equal(4);

    expect(sides[0].begin.x).to.equal(-5);
    expect(sides[0].begin.y).to.equal(-5);
    expect(sides[0].end.x).to.equal(5);
    expect(sides[0].end.y).to.equal(-5);

    expect(sides[1].begin.x).to.equal(5);
    expect(sides[1].begin.y).to.equal(-5);
    expect(sides[1].end.x).to.equal(5);
    expect(sides[1].end.y).to.equal(5);

    expect(sides[2].begin.x).to.equal(5);
    expect(sides[2].begin.y).to.equal(5);
    expect(sides[2].end.x).to.equal(-5);
    expect(sides[2].end.y).to.equal(5);

    expect(sides[3].begin.x).to.equal(-5);
    expect(sides[3].begin.y).to.equal(5);
    expect(sides[3].end.x).to.equal(-5);
    expect(sides[3].end.y).to.equal(-5);
  }

  @test 'should calculate bounds' () {
    const bounds = this.collider.bounds;

    expect(bounds.min.x).to.equal(-5);
    expect(bounds.min.y).to.equal(-5);

    expect(bounds.max.x).to.equal(5);
    expect(bounds.max.y).to.equal(5);

    // rotate 45 degree clockwise
    this.gameObject.transform.rotation = Math.PI / 4;
    this.gameObject.fixedUpdate();

    expect(bounds.min.x).to.closeTo(-7.071068, 1e-6);
    expect(bounds.min.y).to.closeTo(-7.071068, 1e-6);

    expect(bounds.max.x).to.closeTo(7.071068, 1e-6);
    expect(bounds.max.y).to.closeTo(7.071068, 1e-6);
  }

  @test 'contains: should check whether contains point' () {
    const p1 = new Vector(3, -4);
    const p2 = new Vector(6, 4);

    expect(this.collider.contains(p1)).to.be.true;
    expect(this.collider.contains(p2)).to.be.false;
  }

  @test 'rayCast: should return intersection point if ray cast hit' () {
    const ray = new Ray();
    ray.origin.setTo(-10, -3);
    ray.direction.setTo(1, 0);

    const p = this.collider.rayCast(ray);

    expect(p).not.to.be.undefined;
    expect((<Vector>p).x).to.equal(-5);
    expect((<Vector>p).y).to.equal(-3);
  }

  @test 'project: should return projection' () {
    const a1 = new Vector(1, 1).normalize();
    const p1 = this.collider.project(a1);

    expect(p1.min).to.closeTo(-7.071068, 1e-6);
    expect(p1.max).to.closeTo(7.071068, 1e-6);

    const a2 = new Vector(Math.sqrt(3), 1).normalize();
    const p2 = this.collider.project(a2);

    expect(p2.min).to.closeTo(-6.830127, 1e-6);
    expect(p2.max).to.closeTo(6.830127, 1e-6);
  }

  @test 'getFurthestPoint: should return furthest point' () {
    const direction = new Vector(1, 2);
    const p = this.collider.getFurthestPoint(direction);

    expect(p.x).to.equal(5);
    expect(p.y).to.equal(5);
  }

}
