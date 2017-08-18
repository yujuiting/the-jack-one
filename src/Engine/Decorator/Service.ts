import { Token, Type } from 'Engine/Utility/Type';
import { ProviderRegistry } from 'Engine/Base/ProviderRegistry';

export function Service<T>(token?: Token): ClassDecorator {
  return <ClassDecorator>function (target: Type<T>) {
    ProviderRegistry.Provide({ token: token || target, useClass: target });
  };
}
