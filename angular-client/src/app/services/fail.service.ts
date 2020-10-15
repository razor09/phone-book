import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Store } from '../store';

@Injectable({
	providedIn: 'root',
})
export class FailService {

	constructor(
		private store: Store,
	) {}

	public throw(response: HttpErrorResponse): Observable<never> {
		this.store.broken();
		return throwError(response);
	}
}