import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../store';

@Component({
	selector: 'error-container',
	templateUrl: 'error-container.component.html',
})
export class ErrorContainer implements OnInit {

	constructor(
		private store: Store,
	) {}

	public ngOnInit(): void {
		this.store.setError();
	}
}