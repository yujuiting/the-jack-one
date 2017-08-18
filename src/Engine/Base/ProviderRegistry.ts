import 'reflect-metadata';
import { Type, Token, resolveForwardRef } from 'Engine/Utility/Type';

export interface ClassProvider {
  token: Token;
  useClass: Type<any>;
}

export interface ValueProvider {
  token: Token;
  useValue: any;
}

export interface FactoryProvider {
  token: Token;
  useFactory(): any;
}

export type Provider = ClassProvider | ValueProvider | FactoryProvider;

export class ProviderRegistry {

  private static readonly providers: Map<Token, Provider> = new Map();

  public static Provide(provider: Provider): void {
    this.providers.set(provider.token, provider);
  }

  public static Resolve(token: Token): Provider|undefined {
    return this.providers.get(token);
  }

  public static Clear(): void {
    this.providers.clear();
  }

  private readonly service: Map<Token, any> = new Map();

  public get<T>(token: Token): T|undefined {
    const resolvedToken = resolveForwardRef<Token>(token);

    if (this.service.has(resolvedToken)) {
      return this.service.get(resolvedToken);
    }

    const provider = ProviderRegistry.Resolve(resolvedToken);

    if (!provider) {
      return;
    }

    let service: any;

    if ((<ClassProvider>provider).useClass) {
      service = this.instantiate((<ClassProvider>provider).useClass);
    }

    if ((<FactoryProvider>provider).useFactory) {
      service = this.create((<FactoryProvider>provider).useFactory);
    }

    if ((<ValueProvider>provider).useValue) {
      service = (<ValueProvider>provider).useValue;
    }

    if (service) {
      this.service.set(resolvedToken, service);
    }

    return service;
  }

  public instantiate<T>(InstanceType: Type<T>, ...args: any[]): T {
    this.resolveDependencies(InstanceType, args);
    return new InstanceType(...args);
  }

  public create<T>(factory: Function, ...args: any[]): T {
    this.resolveDependencies(factory, args);
    return factory(...args);
  }

  private resolveDependencies(target: any, args: any[]): void {
    const dependencies: Token[] =  Reflect.getMetadata('design:paramtypes', target) || [];
    dependencies.forEach((dependency, index) => {
      const service = this.get(dependency);
      args.splice(index, 0, service);
    });
  }

}
