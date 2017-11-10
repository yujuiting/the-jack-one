import { Bundle } from 'Engine/Resource/Bundle';
import { Resource } from 'Engine/Resource/Resource';
import { Service } from 'Engine/Decorator/Service';
import { ResourceManager } from 'Engine/Resource/ResourceManager';

@Service()
export class ResourceManagerImplement implements ResourceManager {

  private bundle: Bundle = new Bundle('default');

  public add(resource: Resource): void {
    this.bundle.add(resource);
  }

}
