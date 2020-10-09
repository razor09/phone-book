import { $router } from '../services';

class FailService {

	public reject(): Promise<never> {
		$router.navigate('/error');
		return Promise.reject();
	}
}

export const $fail = new FailService();