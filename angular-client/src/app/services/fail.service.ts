import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FailService {

	constructor(
		private router: Router,
	) {}

	public throw(response: HttpErrorResponse): Observable<never> {
		this.router.navigateByUrl('error');
		return throwError(response);
	}
}