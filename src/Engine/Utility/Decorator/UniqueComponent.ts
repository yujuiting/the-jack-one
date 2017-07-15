import { Class } from 'Engine/Utility/Type';
import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';

export function UniqueComponent() {
  return function <T extends Class<Component>>(Type: T): T {
    return class extends Type {
      constructor(...args: any[]) {
        super(...args);
        const target: GameObject = args[0];
        if (target.getComponent(Type)) {
          throw new Error('Unique component');
        }
      }
    };
  };
}
