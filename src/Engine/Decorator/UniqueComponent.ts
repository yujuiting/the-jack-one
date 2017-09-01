import { Type } from 'Engine/Utility/Type';
import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';

export function UniqueComponent(): ClassDecorator {
  return <any>function (ComponentType: Type<Component>) {
    Reflect.defineMetadata('component:unique', true, ComponentType);
  };
}
