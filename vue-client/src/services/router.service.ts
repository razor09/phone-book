import { RawLocation } from 'vue-router';
import { router } from '../root/root.router';

class RouterService {

	public navigate(location: RawLocation): void {
		router.replace(location);
	}
}

export const $router = new RouterService();