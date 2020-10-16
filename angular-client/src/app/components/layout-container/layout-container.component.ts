import { Component } from '@angular/core';
import { Store } from '../../store';

@Component({
  selector: 'layout-container',
  templateUrl: 'layout-container.component.html',
  styleUrls: ['layout-container.component.scss'],
})
export class LayoutContainer {

  constructor(
    public store: Store,
  ) {}
}
