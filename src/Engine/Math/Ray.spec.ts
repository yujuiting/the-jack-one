// tslint:disable member-access
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Ray } from 'Engine/Math/Ray';

@suite class RayTestSuite {

  @test 'should return point on ray' () {
    const ray = new Ray();
    ray.origin.setTo(2, 5);
    ray.direction.setTo(3, 4).normalize();

    const p = ray.getPoint(5);
    expect(p.x).to.equal(5);
    expect(p.y).to.equal(9);
  }

}
