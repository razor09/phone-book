import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services';
import { Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class Authorized implements CanActivate {

  constructor(
    private router: Router,
    private $auth: AuthService,
    private store: Store,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.$auth.checkAuth().pipe(
      tap((isAuth) => {
        isAuth ? this.store.authorized() : this.router.navigateByUrl('');
      }),
    );
  }
}
