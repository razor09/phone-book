import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Auth } from '../models';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	constructor(
		private api: ApiService,
	) {}

	public buildForm(): FormGroup {
		return new FormGroup({
			user: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
		});
	}

	public login(auth: Auth): Observable<boolean> {
		return this.api.post<boolean>('login', auth);
	}

	public checkAuth(): Observable<boolean> {
		return this.api.get<boolean>('check');
	}

	public logout(): Observable<void> {
		return this.api.delete<void>('logout');
	}
}