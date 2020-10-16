import { NavigationGuardNext, Route } from 'vue-router';
import { $auth } from '../services';
import { $store } from '../store';

class AccessService {

  public authorized(_: Route, __: Route, next: NavigationGuardNext<Vue>): void {
    $auth.checkAuth().then((isAuth) => {
      if (isAuth) {
        $store.authorized();
        next();
      } else {
        $store.unauthorized();
        next('/');
      }
    });
  }

  public unauthorized(_: Route, __: Route, next: NavigationGuardNext<Vue>): void {
    $auth.checkAuth().then((isAuth) => {
      if (isAuth) {
        $store.authorized();
        next('/contacts');
      } else {
        $store.unauthorized();
        next();
      }
    });
  }
}

export const $access = new AccessService();
