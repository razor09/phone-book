import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services';
import { Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class Unauthorized implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authService.checkAuth().pipe(
      tap((isAuth) => {
        isAuth ? this.router.navigateByUrl('contacts') : this.store.unauthorized();
      }),
      map((isAuth) => !isAuth),
    );
  }
}
