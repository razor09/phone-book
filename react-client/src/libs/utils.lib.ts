import { helpers } from '../libs';
import { DebounceFactory, Pipe } from '../models';

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
		return Object.keys(body).reduce<T>((object, key) => {
			const value = body[key];
			return {
				...object,
				[key]: helpers.isString(value) ? value.replace(pattern, '') : value,
			};
		}, initial);
	}

	public toPlainObject<T extends object>(instance: T): T {
		const initial = new Object() as T;
		return this.compose(instance)
			.pipe(Object.getPrototypeOf)
			.pipe(Object.getOwnPropertyNames)
			.pipe((keys) => [...keys, ...Object.getOwnPropertyNames(instance)])
			.pipe((keys) => keys.filter((key) => key !== 'constructor'))
			.result()
			.reduce((object, key) => {
				return {
					...object,
					[key]: instance[key],
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

	public resetForm(form: HTMLFormElement): void {
		form.reset();
		Array.from(form.elements).forEach((element) => {
			if (element instanceof HTMLInputElement) {
				element.blur();
			}
		});
	}

	public delay(callback: Function): void {
		self.setTimeout(callback, 960);
	}

	public debounceFactory(callback: Function, delay: number): DebounceFactory {
		let id = 0;
		return () => {
			self.clearTimeout(id);
			id = self.setTimeout(() => {
				callback();
				id = 0;
			}, delay);
		}
	}
}

export const utils = new Utils();