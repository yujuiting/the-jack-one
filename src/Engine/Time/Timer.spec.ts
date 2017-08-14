// tslint:disable member-access no-unused-expression
import { suite, test } from 'mocha-typescript';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import { Timer } from 'Engine/Time/Timer';
import { Time } from 'Engine/Time/Time';
import { getService } from 'Engine/Base/runtime';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

@suite class TimerTestSuite {

  time: Time;

  before() {
    this.time = <Time>getService(Time);
  }

  @test 'it should pause by default' () {
    const timer = new Timer();
    expect(timer.isActive).to.be.false;
  }

  @test 'it should update timestamp' () {
    const timer = new Timer();

    this.time.tick(1);
    timer.update();
    expect(timer.timestamp).to.equal(1);

    this.time.tick(1);
    timer.update();
    expect(timer.timestamp).to.equal(2);
  }

  @test 'it should fire time event' () {
    const timer = new Timer();
    const onTimeEvent = spy();
    timer.timeEvent$.subscribe(onTimeEvent);

    this.time.tick(1000);
    timer.update();

    expect(onTimeEvent).to.be.calledOnce;
  }

}
