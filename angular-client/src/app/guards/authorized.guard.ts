import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services';

@Injectable({
	providedIn: 'root',
})
export class Authorized implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
	) {}

	public canActivate(): Observable<boolean> {
		return this.authService.checkAuth().pipe(
			tap((isAuth) => {
				if (!isAuth) {
					this.router.navigateByUrl('');
				}
			}),
		);
	}
}