import 'Engine/imports';
import { Engine } from 'Engine/Base/Engine';
import { ProviderRegistry, Provider } from 'Engine/Utility/ProviderRegistry';
import { Class, Token } from 'Engine/Utility/Type';

export namespace runtime {
  const providerRegistry = new ProviderRegistry();
  let engine: Engine;

  export function bootstrap(container: HTMLElement): Promise<void> {
    engine = <Engine>providerRegistry.get(Engine);
    return engine.initialize(container);
  }

  export function provide(providers: Provider[]): void {
    providers.forEach(provider => ProviderRegistry.Provide(provider));
  }

  export function instantiate<T>(InstanceType: Class<T>, ...args: any[]): T {
    return providerRegistry.instantiate(InstanceType, ...args);
  }

  export function get<T>(token: Token): T|undefined {
    return providerRegistry.get(token);
  }

  export function create<T>(factory: Function, ...args: any[]): T|undefined {
    return providerRegistry.create(factory, ...args);
  }
}
