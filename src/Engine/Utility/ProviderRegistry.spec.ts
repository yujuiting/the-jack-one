// tslint:disable member-access max-classes-per-file
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { ProviderRegistry } from 'Engine/Utility/ProviderRegistry';

class Foo { prop: string; }

class Foo2 { prop: string; }

class Bar {
  prop: string;
  constructor(public foo: Foo) {}
}

@suite class ProviderRegistryTestSuite {

  serviceRegistry: ProviderRegistry;

  before() {
    this.serviceRegistry = new ProviderRegistry();
  }

  @test 'should provide instance' () {
    this.serviceRegistry.provide(Foo);
    expect(this.serviceRegistry.get(Foo)).to.be.instanceOf(Foo);
  }

  @test 'should provide value' () {
    this.serviceRegistry.provideValue(new Foo2(), Foo);
    expect(this.serviceRegistry.get(Foo)).to.be.instanceOf(Foo2);
  }

  @test 'should resolve dependencies' () {
    this.serviceRegistry.provide(Foo);
    this.serviceRegistry.registerDependency(Bar, Foo, 0);
    const bar = this.serviceRegistry.instantiate(Bar);
    expect(bar).to.be.instanceOf(Bar);
    expect(bar.foo).to.be.instanceOf(Foo);
  }

}
