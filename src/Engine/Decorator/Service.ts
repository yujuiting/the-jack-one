import { Token, Class } from 'Engine/Utility/Type';
import { ProviderRegistry } from 'Engine/Base/ProviderRegistry';

export function Service<T>(token?: Token): (target: Class<T>) => void {
  return function (target: Class<T>) {
    ProviderRegistry.Provide({ token: token || target, useClass: target });
  };
}
