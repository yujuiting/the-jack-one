// tslint:disable member-access no-unused-expression class-name max-classes-per-file
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { stub } from 'sinon';
import { GameObject } from 'Engine/Core/GameObject';
import { instantiate } from 'Engine/runtime';
import { BuiltInLayer } from 'Engine/Utility/Type';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Component } from 'Engine/Core/Component';
import { UniqueComponent } from 'Engine/Decorator/UniqueComponent';
import { RequireComponent } from 'Engine/Decorator/RequireComponent';

@suite class Constructor_TestSuite {

  gameObject: GameObject;

  before() {
    this.gameObject = instantiate(GameObject);
  }

  after() {
    this.gameObject.destroy();
  }

  @test 'should not be active' () {
    expect(this.gameObject.isActive).to.be.false;
  }

  @test 'should not be destroyed' () {
    expect(this.gameObject.isDestroyed).to.be.false;
  }

  @test 'should not had started' () {
    expect(this.gameObject.hasStarted).to.be.false;
  }

  @test 'should stay in default layer' () {
    expect(this.gameObject.layer).to.equal(BuiltInLayer.Default);
  }

  @test 'should not have parent' () {
    expect(this.gameObject.parent).to.be.undefined;
  }

  @test 'should have a transform component' () {
    expect(this.gameObject.getComponent(TransformComponent)).to.be.instanceOf(TransformComponent);
    expect(this.gameObject.getComponents(TransformComponent).size).to.equal(1);
  }

}

@suite class Tag_TestSuite {

  gameObject: GameObject;

  tagName = 'test-tag';

  before() {
    this.gameObject = instantiate(GameObject);
    this.gameObject.addTag(this.tagName);
  }

  after() {
    this.gameObject.destroy();
  }

  @test 'should has tag' () {
    expect(this.gameObject.hasTag(this.tagName)).to.be.true;
  }

  @test 'should find by tag' () {
    const tageds = GameObject.FindWithTag(this.tagName);
    expect(tageds.size).to.equal(1);
    expect(tageds.values().next().value).to.equal(this.gameObject);
  }

  @test 'should remove tag' () {
    this.gameObject.removeTag(this.tagName);
    const tageds = GameObject.FindWithTag(this.tagName);
    expect(tageds.size).to.equal(0);
  }

}

class TestComponent extends Component {}

@UniqueComponent()
class TestUniqueComponent extends Component {}

@RequireComponent([TestComponent])
class TestRequireComponent extends Component {}

@suite class Component_TestSuite {

  gameObject: GameObject;

  before() {
    this.gameObject = instantiate(GameObject);
  }

  after() {
    this.gameObject.destroy();
  }

  @test 'should get component' () {
    // transform component is default built-in.
    const component = this.gameObject.getComponent(TransformComponent);
    expect(component).not.to.be.undefined;
  }

  @test 'should add component' () {
    this.gameObject.addComponent(TestComponent);
    const component = this.gameObject.getComponent(TestComponent);
    expect(component).to.be.instanceOf(TestComponent);
  }

  @test 'should check unique when adding' () {
    const should_not_throw = () => {
      // add fitst time
      this.gameObject.addComponent(TestUniqueComponent);
    };

    const should_throw = () => {
      // add again
      this.gameObject.addComponent(TestUniqueComponent);
    };

    expect(should_not_throw).not.to.throw();
    expect(should_throw).to.throw();
  }

  @test 'should check required components when adding' () {
    const should_throw = () => {
      // add first time, there is no required component
      this.gameObject.addComponent(TestRequireComponent);
    };

    const should_not_throw = () => {
      // add required component
      this.gameObject.addComponent(TestComponent);
      // and add again
      this.gameObject.addComponent(TestRequireComponent);
    };

    expect(should_throw).to.throw();
    expect(should_not_throw).not.to.throw();
  }

  @test 'should remove component' () {
    this.gameObject.addComponent(TestComponent);
    let component = this.gameObject.getComponent(TestComponent);
    expect(component).not.to.be.undefined;

    this.gameObject.removeComponent(<TestComponent>component);

    component = this.gameObject.getComponent(TestComponent);
    expect(component).to.be.undefined;
  }

  @test 'should get components' () {
    this.gameObject.addComponent(TestComponent);
    this.gameObject.addComponent(TestComponent);
    this.gameObject.addComponent(TestComponent);
    const components = this.gameObject.getComponents(TestComponent);
    expect(components.size).to.equal(3);
  }

}

@suite class Component_LifeCycle_TestSuite {

  gameObject: GameObject;

  component: Component;

  before() {
    this.gameObject = instantiate(GameObject);
    this.component = this.gameObject.addComponent(TestComponent);
  }

  after() {
    this.gameObject.destroy();
  }

  @test 'life cycle: start' () {
    const componentStart = stub(this.component, 'start');
    this.gameObject.start();
    expect(componentStart).to.be.calledOnce;
  }

  @test 'life cycle: destroy' () {
    const componentStart = stub(this.component, 'destroy');
    this.gameObject.destroy();
    expect(componentStart).to.be.calledOnce;
  }

  @test 'life cycle: fixedUpdate' () {
    const componentStart = stub(this.component, 'fixedUpdate');
    this.gameObject.fixedUpdate();
    expect(componentStart).to.be.calledOnce;
  }

  @test 'life cycle: update' () {
    const componentStart = stub(this.component, 'update');
    this.gameObject.update();
    expect(componentStart).to.be.calledOnce;
  }

  @test 'life cycle: lateUpdate' () {
    const componentStart = stub(this.component, 'lateUpdate');
    this.gameObject.lateUpdate();
    expect(componentStart).to.be.calledOnce;
  }

  @test 'life cycle: preRender' () {
    const componentStart = stub(this.component, 'preRender');
    this.gameObject.preRender();
    expect(componentStart).to.be.calledOnce;
  }

  @test 'life cycle: postRender' () {
    const componentStart = stub(this.component, 'postRender');
    this.gameObject.postRender();
    expect(componentStart).to.be.calledOnce;
  }
}

@suite class Children_TestSuite {

  parent: GameObject;

  child: GameObject;

  before() {
    this.parent = instantiate(GameObject);
    this.child = instantiate(GameObject);
  }

  after() {
    this.parent.destroy();
    this.child.destroy();
  }

  @test 'should add child' () {
    this.parent.addChild(this.child);
    expect(this.child.parent).to.equal(this.parent);
  }

  @test 'should remove origin parent when adding to another' () {
    this.parent.addChild(this.child);
    const another = instantiate(GameObject);
    another.addChild(this.child);
    expect(this.child.parent).to.equal(another);
    another.destroy();
  }

  @test 'should remove child' () {
    this.parent.addChild(this.child);
    this.parent.removeChild(this.child);
    expect(this.child.parent).to.be.undefined;
  }

}
