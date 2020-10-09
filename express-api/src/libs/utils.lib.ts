import { helpers } from '../libs';
import { Pipe } from '../models';

class Utils {

	public compose<T>(value: T): Pipe<T> {
		return {
			pipe: (callback) => {
				const result = callback(value);
				return this.compose(result);
			},
			result: () => value,
		};
	}

	public removeTags<T extends object>(body: T): T {
		const initial = new Object() as T;
		const pattern = /<\/?[^>]+>/gi;
		return Object.keys(body).reduce<T>((data, key) => {
			const value = body[key];
			return {
				...data,
				[key]: helpers.isString(value) ? value.replace(pattern, '') : value,
			};
		}, initial);
	}

	public toInteger(value: string): number {
		return this.compose(value)
			.pipe(Number)
			.pipe(Math.ceil)
			.pipe(Math.abs)
			.result() || 0;
	}
}

export const utils = new Utils();