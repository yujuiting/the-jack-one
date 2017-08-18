import { GameObject } from 'Engine/Base/GameObject';
import { Service } from 'Engine/Decorator/Service';

@Service()
export class GameObjectInitializer {

  private queue: GameObject[] = [];

  get length(): number { return this.queue.length; }

  public push(gameObject: GameObject): void {
    this.queue.push(gameObject);
  }

  public resolve(): void {
    let gameObject = this.queue.shift();
    while (gameObject) {
      gameObject.initialize();
      gameObject = this.queue.shift();
    }
  }

}
