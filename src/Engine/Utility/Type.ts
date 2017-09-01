export interface Type<T> extends Function {
  new (...args: any[]): T;
  name: string;
}

export function getClass<T>(instance: T): Type<T> {
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

export type Token = Type<any> | Symbol | string | ForwardRefFn<any>;

export interface ForwardRefFn<T> {
  (): T;
  __forward_ref__?: ForwardRefFn<T>;
}

export function forwardRef<T>(get: ForwardRefFn<T>): ForwardRefFn<T> {
  get.__forward_ref__ = get;
  return get;
}

export function resolveForwardRef<T>(ref: T|ForwardRefFn<T>): T {
  if (typeof ref === 'function' && ref.hasOwnProperty('__forward_ref__') && ref.__forward_ref__ === ref) {
    return (<ForwardRefFn<T>>ref)();
  } else {
    return <T>ref;
  }
}
