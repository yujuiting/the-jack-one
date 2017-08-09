import { Class } from 'Engine/Utility/Type';
import { Component } from 'Engine/Base/Component';
import { addToArray } from 'Engine/Utility/ArrayUtility';

export function RequireComponent(RequireTypes: Class<Component>[]): ClassDecorator {
  return <any>function(Type: Class<Component>) {
    const requireComponentTypes: Class<Component>[] = Reflect.getMetadata('component:require', Type) || [];
    RequireTypes.forEach(RequireType => addToArray(requireComponentTypes, RequireType));
    Reflect.defineMetadata('component:require', requireComponentTypes, Type);
    // return class extends Type {
    //   constructor(...args: any[]) {
    //     super(...args);
    //     const target: GameObject = args[0];
    //     RequireTypes.forEach(RequireType => {
    //       if (!target.getComponent(RequireType)) {
    //         // throw new Error(`Component ${Type.name} require component ${RequireType.name}`);
    //         target.addComponent(RequireType);
    //       }
    //     });
    //   }
    // };
  };
}
