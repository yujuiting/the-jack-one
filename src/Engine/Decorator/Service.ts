import { Token, Type } from 'Engine/Utility/Type';
import { providerRegistry } from 'Engine/Core/ProviderRegistry';

export function Service<T>(token?: Token): ClassDecorator {
  return <ClassDecorator>function (target: Type<T>) {
    providerRegistry.provide({ token: token || target, useClass: target });
  };
}
