import { GameObject } from 'Engine/Core/GameObject';
import { Service } from 'Engine/Decorator/Service';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';

@Service(GameObjectInitializer)
export class GameObjectInitializerImplement implements GameObjectInitializer {

  private queue: GameObject[] = [];

  get length(): number { return this.queue.length; }

  public push(gameObject: GameObject): void {
    this.queue.push(gameObject);
  }

  public resolve(): void {
    let gameObject = this.queue.shift();
    while (gameObject) {
      GameObject.Initialize(gameObject);
      gameObject = this.queue.shift();
    }
  }

}
