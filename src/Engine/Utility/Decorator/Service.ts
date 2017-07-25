import { Token, Class } from 'Engine/Utility/Type';
import { providerRegistry } from 'Engine/Utility/ProviderRegistry';

export function Service<T>(): (target: Class<T>) => void {
  return function (target: Class<T>) {
    providerRegistry.provide(target);
  };
}
