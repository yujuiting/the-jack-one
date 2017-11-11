// tslint:disable member-access no-unused-expression
import 'Engine/preset';
import { suite, test } from 'mocha-typescript';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import { Time } from 'Engine/Time/Time';
import { Timer } from 'Engine/Time/Timer';
import { instantiate, getService } from 'Engine/runtime';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';
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

  @test 'it should update timestamp' () {
    this.time.update(1);
    this.timer.update();
    expect(this.timer.timestamp).to.equal(1);

    this.time.update(1);
    this.timer.update();
    expect(this.timer.timestamp).to.equal(2);
  }

  @test 'it should fire time event' () {
    const onTimeEvent = spy();
    this.timer.timeEvent$.subscribe(onTimeEvent);

    this.time.update(1000);
    this.timer.update();

    expect(onTimeEvent).to.be.calledOnce;
  }

}
