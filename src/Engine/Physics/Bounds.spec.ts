// tslint:disable member-access no-unused-expression
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Vector } from 'Engine/Math/Vector';
import { Bounds } from 'Engine/Physics/Bounds';

@suite class BoundsTestSuite {

  bounds: Bounds;

  before() {
    this.bounds = new Bounds();
    this.bounds.center.setTo(4, 7);
    this.bounds.extents.setTo(20, 10);
  }

  @test 'should return min' () {
    const min = this.bounds.min;
    expect(min.x).to.equal(-16);
    expect(min.y).to.equal(-3);
  }

  @test 'should return max' () {
    const max = this.bounds.max;
    expect(max.x).to.equal(24);
    expect(max.y).to.equal(17);
  }

  @test 'should return size' () {
    const size = this.bounds.size;
    expect(size.x).to.equal(40);
    expect(size.y).to.equal(20);
  }

  @test 'should check point is contain in' () {
    const p1 = new Vector(10, 10);
    const p2 = new Vector(10, -10);
    expect(this.bounds.containPoint(p1)).to.be.true;
    expect(this.bounds.containPoint(p2)).to.be.false;
  }

  @test 'should check bounds is intersected' () {
    const b1 = new Bounds();
    b1.center.setTo(20, 20);
    b1.extents.setTo(5, 5);
    expect(this.bounds.intersects(b1)).to.be.true;

    const b2 = new Bounds();
    b2.center.setTo(40, 40);
    b2.extents.setTo(10, 10);
    expect(this.bounds.intersects(b2)).to.be.false;
  }

}
