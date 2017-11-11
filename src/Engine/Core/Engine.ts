import { Vector } from 'Engine/Math/Vector';
import { Scene } from 'Engine/Core/Scene';

export const Engine = Symbol('Engine');

export interface Engine {

  readonly gravity: Vector;

  isPaused: boolean;

  /**
   * Initial scene is required, engine will be bootstraped after initial scene loaded.
   */
  initialize(initialScene: Scene): Promise<void>;

  pause(): void;

  resume(): void;

}
