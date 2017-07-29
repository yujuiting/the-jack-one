// tslint:disable member-access
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Matrix2D } from './Matrix2D';
import { Vector } from './Vector';

@suite class Matrix2DTestSuite {

  @test 'should has default value' () {
    const m = new Matrix2D();
    expect(m[0][0]).to.equal(1);
    expect(m[0][1]).to.equal(0);
    expect(m[1][0]).to.equal(0);
    expect(m[1][1]).to.equal(1);
  }

  @test 'should write default value' () {
    const m = new Matrix2D([
      [1, 2],
      [3, 4]
    ]);
    expect(m[0][0]).to.equal(1);
    expect(m[0][1]).to.equal(2);
    expect(m[1][0]).to.equal(3);
    expect(m[1][1]).to.equal(4);
  }

  @test 'should set rotation' () {
    const m = new Matrix2D();
    m.setRotatation(Math.PI); // rotate 180 degree
    expect(m[0][0]).to.equal(-1);
    expect(m[0][1]).to.closeTo(0, 1e-10);
    expect(m[1][0]).to.closeTo(0, 1e-10);
    expect(m[1][1]).to.equal(-1);
  }

  @test 'should set translation' () {
    const m = new Matrix2D();
    const v = new Vector(10, 5);
    m.setTranslation(v);
    expect(m[0][0]).to.equal(1);
    expect(m[0][1]).to.equal(0);
    expect(m[0][2]).to.equal(v.x);
    expect(m[1][0]).to.equal(0);
    expect(m[1][1]).to.equal(1);
    expect(m[1][2]).to.equal(v.y);
    expect(m[2][0]).to.equal(0);
    expect(m[2][1]).to.equal(0);
    expect(m[2][2]).to.equal(1);
  }

  @test 'should set scaling' () {
    const m = new Matrix2D();
    const v = new Vector(2, 3);
    m.setScaling(v);
    expect(m[0][0]).to.equal(v.x);
    expect(m[0][1]).to.equal(0);
    expect(m[1][0]).to.equal(0);
    expect(m[1][1]).to.equal(v.y);
  }

  @test 'should multiply to self' () {
    const m1 = new Matrix2D([
      [1, 2],
      [3, 4]
    ]);
    const m2 = new Matrix2D([
      [5, 6],
      [7, 8]
    ]);
    m1.multiply(m2);
    expect(m1[0][0]).to.equal(19);
    expect(m1[0][1]).to.equal(22);
    expect(m1[1][0]).to.equal(43);
    expect(m1[1][1]).to.equal(50);
  }

  @test 'should multiply to pointer' () {
    const m = new Matrix2D();
    const p = new Vector(4, 4);
    m.setTranslation(new Vector(3, 3));
    m.setScaling(new Vector(2, 2));
    m.multiplyToPoint(p);
    expect(p.x).to.equal(11);
    expect(p.y).to.equal(11);
  }

  @test 'should multiply to vector' () {
    const m = new Matrix2D();
    const v = new Vector(4, 0);
    m.setTranslation(new Vector(3, 3)); // should not perform translation
    m.setScaling(new Vector(2, 2));
    m.setRotatation(Math.PI / 2); // rotate 90 degree on anticlockwise
    m.multiplyToVector(v);
    expect(v.x).to.closeTo(0, 1e-10);
    expect(v.y).to.equal(8);
  }

  @test 'should clone' () {
    const m1 = new Matrix2D([
      [1, 2],
      [3, 4]
    ]);
    const m2 = m1.clone();
    expect(m1).not.to.equal(m2);
    expect(m1[0][0]).to.equal(m2[0][0]);
    expect(m1[0][1]).to.equal(m2[0][1]);
    expect(m1[1][0]).to.equal(m2[1][0]);
    expect(m1[1][1]).to.equal(m2[1][1]);
  }

  @test 'should to string' () {
    const m = new Matrix2D([
      [1, 2],
      [3, 4]
    ]);
    expect(m.toString()).to.equal('Matrix [1,2,0][3,4,0][0,0,1]');
  }

}
