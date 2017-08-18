import { Token, Type } from 'Engine/Utility/Type';
import { getService } from 'Engine/Base/runtime';

export function Inject(token: Token): PropertyDecorator {
  return function (target: Type<any>, propertyKey: string | symbol) {
    (<any>target)[propertyKey] = getService(token);
  };
}
