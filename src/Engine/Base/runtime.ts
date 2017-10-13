import { Engine } from 'Engine/Base/Engine';
import { providerRegistry, Provider } from 'Engine/Base/ProviderRegistry';
import { Type, Token } from 'Engine/Utility/Type';

let engine: Engine;

export async function bootstrap(): Promise<void> {
  engine = <Engine>providerRegistry.get(Engine);
  return engine.initialize();
}

export function provide(providers: Provider[]): void {
  providers.forEach(provider => providerRegistry.provide(provider));
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
