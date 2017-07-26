import 'reflect-metadata';
import { Class, Token } from 'Engine/Utility/Type';

const DI_DEPENDENCIES = Symbol('DI_DEPENDENCIES');

type DependencyDescriptor = { token: Token, index: number };

export class ProviderRegistry {

  private readonly service: Map<Token, any> = new Map();

  public provide(Service: Class<any>, token: Token = Service): void {
    if (this.service.has(token)) {
      throw new Error(`Service token collision ${token}`);
    }
    this.service.set(token, this.instantiate(Service));
  }

  public provideValue(value: any, token: Token): void {
    if (this.service.has(token)) {
      throw new Error(`Service token collision ${token}`);
    }
    this.service.set(token, value);
  }

  public get<T = Token>(token: Token): T {
    return this.service.get(token);
  }

  public registerDependency(target: Class<any>, token: Token, index: number): void {
    const dependencies: DependencyDescriptor[] = Reflect.getMetadata(DI_DEPENDENCIES, target) || [];
    dependencies.push({ token, index });
    Reflect.defineMetadata(DI_DEPENDENCIES, dependencies, target);
  }

  public instantiate<T>(InstanceType: Class<T>, ...args: any[]): T {
    const dependencies: DependencyDescriptor[] =  Reflect.getMetadata(DI_DEPENDENCIES, InstanceType) || [];
    dependencies.sort((a, b) => a.index - b.index);
    dependencies.forEach(dependency => {
      const service = this.get(dependency.token);

      if (!service) {
        throw new Error(`Not found dependency ${dependency}`);
      }

      args.splice(dependency.index, 0, service);
    });
    return new InstanceType(...args);
  }

}

export const providerRegistry = new ProviderRegistry();
