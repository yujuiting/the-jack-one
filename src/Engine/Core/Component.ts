import { BaseObject } from 'Engine/Core/BaseObject';
import { GameObject } from 'Engine/Core/GameObject';
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
    this.host.removeComponent(component);
  }

  public getComponent<T extends Component>(componentType: Type<T>): T|undefined {
    return this.host.getComponent(componentType);
  }

  public getComponents<T extends Component>(componentType: Type<T>): ReadonlySet<T> {
    return this.host.getComponents(componentType);
  }

  public toString(): string {
    return `GameComponent(${this.id})`;
  }

}
