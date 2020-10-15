export type Property = string | number | bigint | boolean | undefined | object | symbol | Function;

export type Resolve<T> = (value?: T | PromiseLike<T>) => void;

export type Reject<T> = (reason?: T) => void;

export type DebounceFactory = () => void;

export interface Pipe<T> {
	pipe: <R>(callback: (value: T) => R) => Pipe<R>;
	result: () => T;
}