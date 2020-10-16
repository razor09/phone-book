export type Property = string | number | bigint | boolean | undefined | object | symbol | Function;

export interface Pipe<T> {
  pipe: <R>(callback: (value: T) => R) => Pipe<R>;
  result: () => T;
}
