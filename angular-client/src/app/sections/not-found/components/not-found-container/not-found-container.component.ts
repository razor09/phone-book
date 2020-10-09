import { Component } from '@angular/core';
import { Store } from '../../../../store';

@Component({
	selector: 'not-found-container',
	templateUrl: 'not-found-container.component.html',
})
export class NotFoundContainer {

	constructor(
		private store: Store,
	) {}

	public ngOnInit(): void {
		this.store.setNotFound();
	}
}