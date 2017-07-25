export interface Class<T> extends Function {
  new (...args: any[]): T;
}

export function getClass<T>(instance: T): Class<T> {
  return (<any>instance).constructor;
}

export type Tag = string | Symbol;

/**
 * Layer is a number use as mask
 */
export type Layer = number;

export enum BuiltInLayer {
  Background = 1 << 0,
  Default    = 1 << 1,
  FX         = 1 << 2,
  UI         = 1 << 6
}

export const AllBuiltInLayer = BuiltInLayer.Background |
                               BuiltInLayer.Default |
                               BuiltInLayer.FX |
                               BuiltInLayer.UI;

export type Pair<T> = [T, T];

export type Token = Class<any> | Symbol | string;

export function forward<T>(get: () => T): T {
  return get();
}
