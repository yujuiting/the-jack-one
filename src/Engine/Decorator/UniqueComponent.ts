import { Type } from 'Engine/Utility/Type';
import { Component } from 'Engine/Base/Component';

export function UniqueComponent(): ClassDecorator {
  return <any>function (ComponentType: Type<Component>) {
    Reflect.defineMetadata('component:unique', true, ComponentType);
  };
}
