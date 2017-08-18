import { BaseObject } from 'Engine/Base/BaseObject';
import { GameObject } from 'Engine/Base/GameObject';
import { Type } from 'Engine/Utility/Type';

/**
 *
 */
export abstract class Component extends BaseObject {

  constructor(public readonly host: GameObject) {
    super();
  }

  public addComponent<T extends Component>(componentType: Type<T>): T {
    return this.host.addComponent(componentType);
  }

  public removeComponent(component: Component): void {
    return this.host.removeComponent(component);
  }

  public getComponent<T extends Component>(componentType: Type<T>): T|undefined {
    return this.host.getComponent(componentType);
  }

  public getComponents<T extends Component>(componentType: Type<T>): T[] {
    return this.host.getComponents(componentType);
  }

  public toString(): string {
    return `GameComponent(${this.id})`;
  }

}
