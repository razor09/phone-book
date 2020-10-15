import { utils } from '../libs';
import { Color, Notification, Text, Title } from '../models';

class Store {

	public inProgress = false;
	public isAuth = false;
	public isError = false;
	public title: Title = 'Login';
	public notifications = new Array<Notification>();

	public authorized(): void {
		this.isAuth = true;
		this.setTitle('Dashboard');
	}

	public unauthorized(): void {
		this.isAuth = false;
		this.setTitle('Login');
	}

	public setError(): void {
		this.isAuth = false;
		this.isError = true;
		this.setTitle('Error');
	}

	private setTitle(title: Title): void {
		this.title = title;
		self.document.title = title;
	}

	public setProgress(progress: boolean): void {
		this.inProgress = progress;
	}

	public notify(text: Text, color: Color): void {
		const id = Symbol();
		this.notifications.push({ id, text, color });
		utils.delay(() => {
			this.notifications.shift();
		});
	}
}

export const $store = new Store();