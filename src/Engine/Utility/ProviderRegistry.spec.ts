// tslint:disable member-access max-classes-per-file
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { ProviderRegistry } from 'Engine/Utility/ProviderRegistry';

class Foo { prop: string; }

class Foo2 { prop: string; }

class Bar {
  constructor(public foo: Foo) {}
}

class Lala {
  constructor(public prop: string,
              public foo: Foo) {}
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

  @test 'should pass arguments to constructor' () {
    this.serviceRegistry.provide(Foo);
    this.serviceRegistry.registerDependency(Lala, Foo, 1);
    const lala = this.serviceRegistry.instantiate(Lala, 'my argument');
    expect(lala).to.be.instanceOf(Lala);
    expect(lala.foo).to.be.instanceOf(Foo);
    expect(lala.prop).to.equal('my argument');
  }

}
