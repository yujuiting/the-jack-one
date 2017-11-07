import { Bundle } from 'Engine/Resource/Bundle';
import { Resource } from 'Engine/Resource/Resource';

export const ResourceManager = Symbol('ResourceManager');

export interface ResourceManager {

  add(resource: Resource): void;

}
