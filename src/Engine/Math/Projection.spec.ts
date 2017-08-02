// tslint:disable member-access no-unused-expression
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Projection } from 'Engine/Math/Projection';

@suite class ProjectionTestSuite {

  @test 'should check overlap' () {
    const p1 = new Projection(10, 20);
    const p2 = new Projection(18, 32);
    const p3 = new Projection(-10, 15);

    expect(p1.overlaps(p2)).to.be.true;
    expect(p1.overlaps(p3)).to.be.true;
    expect(p2.overlaps(p3)).to.be.false;
  }

  @test 'should get overlap' () {
    const p1 = new Projection(10, 20);
    const p2 = new Projection(18, 32);
    const p3 = new Projection(-10, 15);

    expect(p1.getOverlap(p2)).to.equal(2);
    expect(p1.getOverlap(p3)).to.equal(5);
  }

}
