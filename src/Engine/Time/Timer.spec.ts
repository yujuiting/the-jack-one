// tslint:disable member-access no-unused-expression
import { suite, test } from 'mocha-typescript';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import { Timer } from 'Engine/Time/Timer';
import { Time } from 'Engine/Time/Time';
import { instantiate, getService } from 'Engine/Base/runtime';
import { GameObjectInitializer } from 'Engine/Base/GameObjectInitializer';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

@suite class TimerTestSuite {

  time: Time;
  timer: Timer;

  before() {
    this.time = <Time>getService(Time);
    this.timer = instantiate(Timer);

    const initializer = <GameObjectInitializer>getService(GameObjectInitializer);
    initializer.resolve();
  }

  @test 'it should pause by default' () {
    expect(this.timer.isActive).to.be.false;
  }

  @test 'it should update timestamp' () {
    this.time.tick(1);
    this.timer.update();
    expect(this.timer.timestamp).to.equal(1);

    this.time.tick(1);
    this.timer.update();
    expect(this.timer.timestamp).to.equal(2);
  }

  @test 'it should fire time event' () {
    const onTimeEvent = spy();
    this.timer.timeEvent$.subscribe(onTimeEvent);

    this.time.tick(1000);
    this.timer.update();

    expect(onTimeEvent).to.be.calledOnce;
  }

}
