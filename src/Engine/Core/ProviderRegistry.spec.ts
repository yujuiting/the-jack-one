// tslint:disable member-access max-classes-per-file
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { ProviderRegistry } from 'Engine/Core/ProviderRegistry';

class Foo { prop: string; }

class Foo2 { prop: string; }

// class Bar {
//   constructor(public foo: Foo) {}
// }

// class Lala {
//   constructor(public prop: string,
//               public foo: Foo) {}
// }

@suite class ProviderRegistryTestSuite {

  providerRegistry: ProviderRegistry;

  before() {
    this.providerRegistry = new ProviderRegistry();
  }

  @test 'should provide instance' () {
    this.providerRegistry.provide({ token: Foo, useClass: Foo });
    expect(this.providerRegistry.get(Foo)).to.be.instanceOf(Foo);
  }

  @test 'should provide value' () {
    this.providerRegistry.provide({ token: Foo, useValue: new Foo2() });
    expect(this.providerRegistry.get(Foo)).to.be.instanceOf(Foo2);
  }

  @test 'should override provider' () {
    this.providerRegistry.provide({ token: Foo, useClass: Foo });
    this.providerRegistry.provide({ token: Foo, useClass: Foo2 });
    expect(this.providerRegistry.get(Foo)).to.be.instanceOf(Foo2);
  }

}
