import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utils } from '../../libs';
import { AuthService } from '../../services';
import { Store } from '../../store';

@Component({
  selector: 'layout-header',
  templateUrl: 'layout-header.component.html',
  styleUrls: ['layout-header.component.scss'],
})
export class LayoutHeader {

  constructor(
    private router: Router,
    private utils: Utils,
    private $auth: AuthService,
    public store: Store,
  ) {}

  public logout(): void {
    this.$auth.logout().pipe(first()).subscribe(() => {
      this.store.notify('Bye', 'darkgreen');
      this.utils.delay(() => {
        this.router.navigateByUrl('');
      });
    });
  }
}
