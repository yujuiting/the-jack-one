import { Token, Class } from 'Engine/Utility/Type';
import { providerRegistry } from 'Engine/Utility/ProviderRegistry';

export function Inject(token: Token): (target: Object, propertyKey: string | symbol, parameterIndex?: number) => void {
  return function (target: Class<any>, propertyKey: string | symbol, index?: number) {
    if (index === void 0) {
      // property
      (<any>target)[propertyKey] = providerRegistry.get(token);
    } else {
      // parameter
      providerRegistry.registerDependency(target, token, index);
    }
  };
}
