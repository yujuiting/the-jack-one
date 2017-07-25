import 'reflect-metadata';
import { Class, Token } from 'Engine/Utility/Type';

const DI_DEPENDENCIES = Symbol('DI_DEPENDENCIES');

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
    const dependencies: Token[] = Reflect.getMetadata(DI_DEPENDENCIES, target) || [];
    dependencies[index] = token;
    Reflect.defineMetadata(DI_DEPENDENCIES, dependencies, target);
  }

  public instantiate<T>(InstanceType: Class<T>): T {
    const dependencies: Token[] =  Reflect.getMetadata(DI_DEPENDENCIES, InstanceType) || [];
    const services: any[] = dependencies.map(dependency => {
      const service = this.get(dependency);

      if (!service) {
        console.warn(`Not found dependency ${dependency}`);
      }

      return service;
    });
    return new InstanceType(...services);
  }

}

export const providerRegistry = new ProviderRegistry();
