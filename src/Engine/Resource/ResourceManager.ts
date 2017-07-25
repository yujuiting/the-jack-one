import { Bundle } from 'Engine/Resource/Bundle';
import { Resource } from 'Engine/Resource/Resource';
import { Service } from 'Engine/Utility/Decorator/Service';

@Service()
export class ResourceManager {

  private bundle: Bundle = new Bundle();

  public add(resource: Resource): void {
    this.bundle.add(resource);
  }

}
