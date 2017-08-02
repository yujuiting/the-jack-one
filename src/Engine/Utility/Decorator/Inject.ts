import { Token, Class } from 'Engine/Utility/Type';
import { ProviderRegistry } from 'Engine/Utility/ProviderRegistry';
import { getService } from 'Engine/Base/runtime';

export function Inject(token: Token): (target: Object, propertyKey: string | symbol, parameterIndex?: number) => void {
  return function (target: Class<any>, propertyKey: string | symbol, index?: number) {
    if (index === void 0) {
      // property
      (<any>target)[propertyKey] = getService(token);
    } else {
      // parameter
      ProviderRegistry.RegisterDependency(target, token, index);
    }
  };
}
