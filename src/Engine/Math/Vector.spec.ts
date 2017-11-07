// tslint:disable member-access no-unused-expression
import 'Engine/preset';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Vector } from './Vector';

@suite class VectorTestSuite {

  @test 'should has default properties' () {
    const v = new Vector();
    expect(v.x).to.equal(0);
    expect(v.y).to.equal(0);
  }

  @test 'should add vector' () {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);
    v1.add(v2);
    expect(v1.x).to.equal(4);
    expect(v1.y).to.equal(6);

    v2.add(5, 6);
    expect(v2.x).to.equal(8);
    expect(v2.y).to.equal(10);
  }

  @test 'should subtract vector' () {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);
    v1.subtract(v2);
    expect(v1.x).to.equal(-2);
    expect(v1.y).to.equal(-2);

    v2.subtract(5, 6);
    expect(v2.x).to.equal(-2);
    expect(v2.y).to.equal(-2);
  }

  @test 'should calculate magnitude' () {
    const v = new Vector(3, 4);
    const l = v.magnitude();
    expect(l).to.equal(5);
  }

  @test 'should calculate square magnitude' () {
    const v = new Vector(3, 4);
    const l = v.squareMagnitude();
    expect(l).to.equal(25);
  }

  @test 'should calculate distance' () {
    const v1 = new Vector(0, 0);
    const v2 = new Vector(3, 4);
    const d = v1.distanceTo(v2);
    expect(d).to.equal(5);
  }

  @test 'should calculate square distance' () {
    const v1 = new Vector(0, 0);
    const v2 = new Vector(3, 4);
    const d = v1.squareDistance(v2);
    expect(d).to.equal(25);
  }

  @test 'should normalize' () {
    const v = new Vector(3, 4);
    v.normalize();
    expect(v.x).to.closeTo(0.6, 1e-6);
    expect(v.y).to.closeTo(0.8, 1e-6);
  }

  @test 'should return normal' () {
    const v = new Vector (3, 4);
    const n = v.normal();
    expect(n.x).to.closeTo(0.8, 1e-6);
    expect(n.y).to.closeTo(-0.6, 1e-6);
  }

  @test 'should scale vector' () {
    const v = new Vector(12, 14);
    v.multiply(2);
    expect(v.x).to.equal(24);
    expect(v.y).to.equal(28);
  }

  @test 'should translate vector' () {
    const v = new Vector(12, 27);
    const o = new Vector(12, 12);
    v.translate(o);
    expect(v.x).to.equal(0);
    expect(v.y).to.equal(15);
  }

  @test 'should reset' () {
    const v = new Vector(4, 7);
    v.reset();
    expect(v.x).to.equal(0);
    expect(v.y).to.equal(0);
  }

  @test 'should rotate' () {
    const l = Math.sqrt(2) * 5;
    const r = Math.PI / 4;
    const v = new Vector(l, 0);

    v.rotate(r);
    expect(v.x).to.closeTo(5, 1e-6);
    expect(v.y).to.closeTo(5, 1e-6);

    v.rotate(r);
    expect(v.x).to.closeTo(0, 1e-6);
    expect(v.y).to.closeTo(l, 1e-6);

    v.rotate(r);
    expect(v.x).to.closeTo(-5, 1e-6);
    expect(v.y).to.closeTo(5, 1e-6);

    v.rotate(r);
    expect(v.x).to.closeTo(-l, 1e-6);
    expect(v.y).to.closeTo(0, 1e-6);
  }

  @test 'should check equal' () {
    const v1 = new Vector(2, 4);
    const v2 = new Vector(3, 5);
    const v3 = new Vector(2, 4);

    expect(v1.equalTo(v2)).to.be.false;
    expect(v1.equalTo(v3)).to.be.true;
  }

  @test 'should calculate dot product' () {
    const v1 = new Vector(2, 4);
    const v2 = new Vector(3, 5);
    const dot = v1.dot(v2);
    expect(dot).to.equal(26);
  }

  @test 'should calculate cross product' () {
    const v1 = new Vector(2, 4);
    const v2 = new Vector(3, 5);
    const cross1 = v1.cross(v2);
    const cross2 = v2.cross(v1);

    expect(cross1).to.equal(-2);
    expect(cross2).to.equal(2);

    const cross3 = v1.cross(3);
    expect(cross3.x).to.equal(12);
    expect(cross3.y).to.equal(-6);
  }

  @test 'should clone' () {
    const v1 = new Vector(1, 2);
    const v2 = v1.clone();
    expect(v1).to.not.equal(v2);
    expect(v1.equalTo(v2)).to.be.true;
  }

  @test 'should copy' () {
    const v1 = new Vector(1, 2);
    const v2 = new Vector().copy(v1);
    expect(v1.equalTo(v2)).to.be.true;
  }

}
