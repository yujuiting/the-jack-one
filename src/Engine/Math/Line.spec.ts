// tslint:disable member-access no-unused-expression
import 'Engine/preset';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Line } from 'Engine/Math/Line';
import { Vector } from 'Engine/Math/Vector';

@suite class LineTestSuite {

  line: Line;

  before() {
    this.line = new Line(
      new Vector(3, 5),
      new Vector(10, 33)
    );
  }

  @test 'should return slope' () {
    expect(this.line.slope).to.equal(4);
  }

  @test 'should return intercept' () {
    expect(this.line.intercept).to.equal(-7);
  }

  @test 'should return length' () {
    expect(this.line.length).to.closeTo(28.861739, 1e-6);
  }

  @test 'should return direction' () {
    const direction = this.line.getDirection();
    expect(direction.x).to.closeTo(0.242535, 1e-6);
    expect(direction.y).to.closeTo(0.970142, 1e-6);
  }

  @test 'should resolve point' () {
    const p1 = new Vector(20, 0);
    const p2 = new Vector(0, -67);

    this.line.resolvePoint(p1, 'x');
    this.line.resolvePoint(p2, 'y');

    expect(p1.y).to.equal(73);
    expect(p2.x).to.equal(-15);
  }

  @test 'should check has point' () {
    const p1 = new Vector(4, 9);
    const p2 = new Vector(5, 20);

    expect(this.line.hasPoint(p1)).to.be.true;
    expect(this.line.hasPoint(p2)).to.be.false;
  }

}
