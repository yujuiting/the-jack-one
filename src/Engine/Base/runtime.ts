import 'Engine/imports';
import { Engine } from 'Engine/Base/Engine';
import { ProviderRegistry, Provider } from 'Engine/Base/ProviderRegistry';
import { Type, Token } from 'Engine/Utility/Type';

const providerRegistry = new ProviderRegistry();
let engine: Engine;

export function bootstrap(container: HTMLElement): Promise<void> {
  engine = <Engine>providerRegistry.get(Engine);
  return engine.initialize(container);
}

export function provide(providers: Provider[]): void {
  providers.forEach(provider => ProviderRegistry.Provide(provider));
}

export function instantiate<T>(InstanceType: Type<T>, ...args: any[]): T {
  return providerRegistry.instantiate(InstanceType, ...args);
}

export function getService<T>(token: Token): T|undefined {
  return providerRegistry.get(token);
}

export function create<T>(factory: Function, ...args: any[]): T|undefined {
  return providerRegistry.create(factory, ...args);
}
