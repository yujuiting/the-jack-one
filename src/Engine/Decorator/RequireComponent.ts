import { Type } from 'Engine/Utility/Type';
import { Component } from 'Engine/Core/Component';
import { addToArray } from 'Engine/Utility/ArrayUtility';

export function RequireComponent(RequireTypes: Type<Component>[]): ClassDecorator {
  return <any>function(ComponentType: Type<Component>) {
    const requireComponentTypes: Type<Component>[] = Reflect.getMetadata('component:require', ComponentType) || [];
    RequireTypes.forEach(RequireType => addToArray(requireComponentTypes, RequireType));
    Reflect.defineMetadata('component:require', requireComponentTypes, ComponentType);
  };
}
