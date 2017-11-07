import { Token } from 'Engine/Utility/Type';
import { providerRegistry } from 'Engine/Core/ProviderRegistry';

export function Inject(token: Token): Function {
  return function (target: any, propertyKey: string | symbol, index?: number) {
    if (index === void 0) {
      (<any>target)[propertyKey] = providerRegistry.get(token);
    } else {
      const paramtypes: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
      paramtypes[index] = token;
      Reflect.defineMetadata('design:paramtypes', paramtypes, target);
    }
  };
}
