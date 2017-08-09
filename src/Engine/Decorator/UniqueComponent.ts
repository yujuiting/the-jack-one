import { Class } from 'Engine/Utility/Type';
import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';

export function UniqueComponent(): ClassDecorator {
  return <any>function (Type: Class<Component>) {
    Reflect.defineMetadata('component:unique', true, Type);
    // return class extends Type {
    //   constructor(...args: any[]) {
    //     super(...args);
    //     const target: GameObject = args[0];
    //     if (target.getComponent(Type)) {
    //       throw new Error('Unique component');
    //     }
    //   }
    // };
  };
}
