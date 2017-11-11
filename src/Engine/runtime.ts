import { Engine } from 'Engine/Core/Engine';
import { providerRegistry, Provider } from 'Engine/Core/ProviderRegistry';
import { Type, Token } from 'Engine/Utility/Type';
import { GameObject } from 'Engine/Core/GameObject';
import { SceneManager } from 'Engine/Core/SceneManager';
import { Vector } from 'Engine/Math/Vector';
import { Scene } from 'Engine/Core/Scene';

let engine: Engine;

const global: Map<any, any> = new Map();

export async function bootstrap(initialScene: Scene): Promise<void> {
  engine = <Engine>providerRegistry.get(Engine);
  return engine.initialize(initialScene);
}

export function provide(providers: Provider[]): void {
  providers.forEach(provider => providerRegistry.provide(provider));
}

/**
 * Instantiate object at runtime, follows arguments will be passed to constructor.
 */
export function instantiate<T>(InstanceType: Type<T>, ...args: any[]): T {
  /**
   * TODO: It may have some way to get the current context when instantiate game object,
   *       and then we can add this game object to parent directly..
   */
  return providerRegistry.instantiate(InstanceType, ...args);
}

export function getService<T>(token: Token): T|undefined {
  return providerRegistry.get(token);
}

export function create<T>(factory: Function, ...args: any[]): T|undefined {
  return providerRegistry.create(factory, ...args);
}

export function def(key: any, value: any = true): void {
  global.set(key, value);
}

export function ifdef(key: any, run: Function): void {
  if (global.has(key)) {
    run();
  }
}

export function ifndef(key: any, run: Function): void {
  if (!global.has(key)) {
    run();
  }
}

export const DEBUG = Symbol('DEBUG');
export const DEBUG_RENDERER = Symbol('DEBUG_RENDERER');
export const DEBUG_PHYSICS = Symbol('DEBUG_PHYSICS');
