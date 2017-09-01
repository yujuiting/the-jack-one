import { Token, Type } from 'Engine/Utility/Type';
import { ProviderRegistry } from 'Engine/Base/ProviderRegistry';

export function Class<T>(token?: Token): ClassDecorator {
  return <ClassDecorator>function (target: Type<T>) {
    return target;
  };
}
