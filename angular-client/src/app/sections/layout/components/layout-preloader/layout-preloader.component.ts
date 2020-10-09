import { Component } from '@angular/core';
import { appearance } from '../../../../animations';
import { Store } from '../../../../store';

@Component({
	selector: 'layout-preloader',
	templateUrl: 'layout-preloader.component.html',
	styleUrls: ['layout-preloader.component.scss'],
	animations: [appearance],
})
export class LayoutPreloader {
	
	constructor(
		public store: Store,
	) {}
}