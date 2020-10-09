import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from '../libs';
import { Color } from '../models';

@Injectable({
	providedIn: 'root',
})
export class Store {

	public inProgress = false;
	public isAuth = false;
	public text = 'Login';
	public color: Color = null;

	constructor(
		private title: Title,
		private utils: Utils,
	) {}

	public setProgress(progress: boolean): void {
		this.inProgress = progress;
	}

	public setTitle(title: string): void {
		this.title.setTitle(title);
	}

	public setAuthStatus(isAuth: boolean): void {
		isAuth ? this.authorized() : this.unauthorized();
	}

	public setError(): void {
		this.isAuth = false;
		this.text = 'Error';
		this.color = 'darkred';
		this.setTitle(this.text);
	}

	public setNotFound(): void {
		this.isAuth = false;
		this.text = '404 Not Found';
		this.color = 'darkorange';
		this.setTitle(this.text);
	}

	public notify(text: string, color: Color): void {
		this.text = text;
		this.color = color;
		this.utils.delay(() => {
			this.text = this.isAuth ? 'Dashboard' : 'Login';
			this.color = null;
		});
	}

	private authorized(): void {
		this.isAuth = true;
		this.text = 'Dashboard';
		this.color = null;
	}

	private unauthorized(): void {
		this.isAuth = false;
		this.text = 'Login';
		this.color = null;
	}
}