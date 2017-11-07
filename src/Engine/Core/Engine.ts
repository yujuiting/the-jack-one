import { Vector } from 'Engine/Math/Vector';

export const Engine = Symbol('Engine');

export interface Engine {

  readonly gravity: Vector;

  isPaused: boolean;

  initialize(): Promise<void>;

  pause(): void;

  resume(): void;

}
