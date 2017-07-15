// tslint:disable member-access
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
  }

  @test 'should subtract vector' () {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);
    v1.subtract(v2);
    expect(v1.x).to.equal(-2);
    expect(v1.y).to.equal(-2);
  }

  @test 'should calculate magnitude' () {
    const v = new Vector(3, 4);
    const l = v.magnitude();
    expect(l).to.equal(5);
  }

  @test 'should translate vector' () {
    const v = new Vector(12, 27);
    const o = new Vector(12, 12);
    v.translate(o);
    expect(v.x).to.equal(0);
    expect(v.y).to.equal(15);
  }

}
