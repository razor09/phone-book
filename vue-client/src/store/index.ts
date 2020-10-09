import { utils } from '../libs';
import { Color, Notification, Text } from '../models';

class Store {

	public inProgress = false;
	public isAuth = false;
	public text: Text = 'Login';
	public notifications = new Array<Notification>();

	public authorized(): void {
		this.isAuth = true;
		this.text = 'Dashboard';
	}

	public unauthorized(): void {
		this.isAuth = false;
		this.text = 'Login';
	}

	public notify(text: string, color: Color): void {
		const id = Symbol();
		this.notifications.push({ id, text, color });
		utils.delay(() => {
			this.notifications.shift();
		});
	}

	public setTitle(title: string): void {
		self.document.title = title;
	}

	public setProgress(progress: boolean): void {
		this.inProgress = progress;
	}

	public setError(): void {
		this.isAuth = false;
		this.text = 'Error';
		this.setTitle(this.text);
	}

	public setNotFound(): void {
		this.isAuth = false;
		this.text = '404 Not Found';
		this.setTitle(this.text);
	}
}

export const $store = new Store();