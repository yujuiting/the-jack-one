import { GameObject } from 'Engine/Base/GameObject';
import { Component } from 'Engine/Base/Component';
import { Class } from 'Engine/Utility/Type';
import { ProviderRegistry } from 'Engine/Base/ProviderRegistry';
import { getService } from 'Engine/Base/runtime';

export function AddComponent(ComponentType: Class<Component>): PropertyDecorator {
  return function (target: Class<any>, propertyKey: string|symbol, index?: number) {
    const componentMap: Map<string|symbol, Class<Component>> = Reflect.getMetadata('component:map', target) || new Map();
    componentMap.set(propertyKey, ComponentType);
    Reflect.defineMetadata('component:map', componentMap, target);
  };
}
