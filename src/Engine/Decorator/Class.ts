import { Token, Type } from 'Engine/Utility/Type';

export function Class<T>(token?: Token): ClassDecorator {
  return <ClassDecorator>function (target: Type<T>) {
    return target;
  };
}
