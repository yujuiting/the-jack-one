import { GameObject } from 'Engine/Core/GameObject';

export const GameObjectInitializer = Symbol('GameObjectInitializer');

export interface GameObjectInitializer {
  // Currently game objects waiting for initialization
  readonly length: number;

  // Push new game object need to initialize
  push(gameObject: GameObject): void;

  // Initialize all pending game objects
  resolve(): void;
}
