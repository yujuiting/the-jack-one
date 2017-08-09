// tslint:disable member-access max-classes-per-file
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { ProviderRegistry } from 'Engine/Base/ProviderRegistry';

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

  after() {
    ProviderRegistry.Clear();
  }

  @test 'should provide instance' () {
    ProviderRegistry.Provide({ token: Foo, useClass: Foo });
    expect(this.serviceRegistry.get(Foo)).to.be.instanceOf(Foo);
  }

  @test 'should provide value' () {
    ProviderRegistry.Provide({ token: Foo, useValue: new Foo2() });
    expect(this.serviceRegistry.get(Foo)).to.be.instanceOf(Foo2);
  }

  @test 'should resolve dependencies' () {
    ProviderRegistry.Provide({ token: Foo, useClass: Foo });
    ProviderRegistry.RegisterDependency(Bar, Foo, 0);
    const bar = this.serviceRegistry.instantiate(Bar);
    expect(bar).to.be.instanceOf(Bar);
    expect(bar.foo).to.be.instanceOf(Foo);
  }

  @test 'should pass arguments to constructor' () {
    ProviderRegistry.Provide({ token: Foo, useClass: Foo });
    ProviderRegistry.RegisterDependency(Lala, Foo, 1);
    const lala = this.serviceRegistry.instantiate(Lala, 'my argument');
    expect(lala).to.be.instanceOf(Lala);
    expect(lala.foo).to.be.instanceOf(Foo);
    expect(lala.prop).to.equal('my argument');
  }

  @test 'should override provider' () {
    ProviderRegistry.Provide({ token: Foo, useClass: Foo });
    ProviderRegistry.Provide({ token: Foo, useClass: Foo2 });
    expect(this.serviceRegistry.get(Foo)).to.be.instanceOf(Foo2);
  }

}
