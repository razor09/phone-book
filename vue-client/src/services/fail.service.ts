import { $store } from '../store';

class FailService {

	public reject(): Promise<never> {
		$store.setError();
		return Promise.reject();
	}
}

export const $fail = new FailService();