import { Class } from 'Engine/Utility/Type';
import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';

export function RequireComponent<T extends Class<Component>>(RequireTypes: T[]): ClassDecorator {
  return <any>function<U extends Class<Component>>(Type: U): U {
    return class extends Type {
      constructor(...args: any[]) {
        super(...args);
        const target: GameObject = args[0];
        RequireTypes.forEach(RequireType => {
          if (!target.getComponent(RequireType)) {
            throw new Error(`Component ${Type.name} require component ${RequireType.name}`);
          }
        });
      }
    };
  };
}
