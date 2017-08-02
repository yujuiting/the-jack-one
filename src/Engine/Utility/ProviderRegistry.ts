import 'reflect-metadata';
import { Class, Token, resolveForwardRef } from 'Engine/Utility/Type';

const DI_DEPENDENCIES = Symbol('DI_DEPENDENCIES');

type DependencyDescriptor = { token: Token, index: number };

export interface ClassProvider {
  token: Token;
  useClass: Class<any>;
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

  /**
   * Register dependency from a class parameter
   * @param target class or function
   * @param token
   * @param index of parameter of class
   */
  public static RegisterDependency(target: Class<any>, token: Token, index: number): void {
    const dependencies: DependencyDescriptor[] = Reflect.getMetadata(DI_DEPENDENCIES, target) || [];
    dependencies.push({ token: resolveForwardRef<Token>(token), index });
    Reflect.defineMetadata(DI_DEPENDENCIES, dependencies, target);
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
      service = (<FactoryProvider>provider).useFactory();
    }

    if ((<ValueProvider>provider).useValue) {
      service = (<ValueProvider>provider).useValue;
    }

    if (service) {
      this.service.set(resolvedToken, service);
    }

    return service;
  }

  public instantiate<T>(InstanceType: Class<T>, ...args: any[]): T {
    this.resolveDependencies(InstanceType, args);
    return new InstanceType(...args);
  }

  public create<T>(factory: Function, ...args: any[]): T {
    this.resolveDependencies(factory, args);
    return factory(...args);
  }

  private resolveDependencies(target: any, args: any[]): void {
    const dependencies: DependencyDescriptor[] =  Reflect.getMetadata(DI_DEPENDENCIES, target) || [];
    dependencies.sort((a, b) => a.index - b.index);
    dependencies.forEach(dependency => {
      const service = this.get(dependency.token);

      if (!service) {
        throw new Error(`Not found dependency ${dependency}`);
      }

      args.splice(dependency.index, 0, service);
    });
  }

}
