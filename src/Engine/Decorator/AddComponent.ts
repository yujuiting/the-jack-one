import { GameObject } from 'Engine/Base/GameObject';
import { Component } from 'Engine/Base/Component';
import { Type } from 'Engine/Utility/Type';

export function AddComponent(ComponentType: Type<Component>): PropertyDecorator {
  return function (target: Type<GameObject>, propertyKey: string|symbol, index?: number) {
    const componentMap: Map<string|symbol, Type<Component>> = Reflect.getMetadata('component:map', target) || new Map();
    componentMap.set(propertyKey, ComponentType);
    Reflect.defineMetadata('component:map', componentMap, target);
  };
}
