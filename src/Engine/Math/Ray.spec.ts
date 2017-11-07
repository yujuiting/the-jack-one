// tslint:disable member-access no-unused-expression
import 'Engine/preset';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Ray } from 'Engine/Math/Ray';
import { Vector } from 'Engine/Math/Vector';
import { Line } from 'Engine/Math/Line';

@suite class RayTestSuite {

  @test 'should return point on ray' () {
    const ray = new Ray();
    ray.origin.setTo(2, 5);
    ray.direction.setTo(3, 4).normalize();

    const p = ray.getPoint(5);
    expect(p.x).to.equal(5);
    expect(p.y).to.equal(9);
  }

  @test 'should return intersect point if two ray are corss' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Ray(new Vector(8, 1), new Vector(-2, 1));
    const t = r1.intersect(r2);
    const p = r1.getPoint(t);
    expect(t).not.to.equal(-1);
    expect(p.x).to.closeTo(4, 1e-6);
    expect(p.y).to.closeTo(3, 1e-6);
  }

  @test 'should return intersect point if ray and line are cross' () {
    const r = new Ray(new Vector(2, 2), new Vector(2, 1));
    const l = new Line(new Vector(8, 1), new Vector(-12, 11));
    const t = r.intersect(l);
    const p = r.getPoint(t);
    expect(t).not.to.equal(-1);
    expect(p.x).to.closeTo(4, 1e-6);
    expect(p.y).to.closeTo(3, 1e-6);
  }

  @test 'should return nothing if two ray are parallel' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Ray(new Vector(8, 1), new Vector(2, 1));
    const t = r1.intersect(r2);
    expect(t).to.equal(-1);
  }

  @test 'should return nothing if ray and line are parallel' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Line(new Vector(8, 1), new Vector(28, 11));
    const t = r1.intersect(r2);
    expect(t).to.equal(-1);
  }

  @test 'should return nothing if two ray are collinear' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Ray(new Vector(0, 1), new Vector(2, 1));
    const t = r1.intersect(r2);
    expect(t).to.equal(-1);
  }

  @test 'should return nothing if ray and line are collinear' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Line(new Vector(0, 1), new Vector(20, 11));
    const t = r1.intersect(r2);
    expect(t).to.equal(-1);
  }

  @test 'should return nothing if two ray have no cross' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Ray(new Vector(8, 1), new Vector(-2, -5));
    const t = r1.intersect(r2);
    expect(t).to.equal(-1);
  }

  @test 'should return nothing if ray and line have no cross' () {
    const r1 = new Ray(new Vector(2, 2), new Vector(2, 1));
    const r2 = new Line(new Vector(8, 1), new Vector(-12, -49));
    const t = r1.intersect(r2);
    expect(t).to.equal(-1);
  }

}
