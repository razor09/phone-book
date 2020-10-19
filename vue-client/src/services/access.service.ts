import { NavigationGuardNext, Route } from 'vue-router';
import { $auth } from '../services';
import { store } from '../store';
import { MutationKeys } from '../store/mutations/mutation-keys';

class AccessService {

  public authorized(_: Route, __: Route, next: NavigationGuardNext<Vue>): void {
    $auth.checkAuth().then((isAuth) => {
      if (isAuth) {
        store.commit(MutationKeys.Authorized);
        next();
      } else {
        store.commit(MutationKeys.Unauthorized);
        next('/');
      }
    });
  }

  public unauthorized(_: Route, __: Route, next: NavigationGuardNext<Vue>): void {
    $auth.checkAuth().then((isAuth) => {
      if (isAuth) {
        store.commit(MutationKeys.Authorized);
        next('/contacts');
      } else {
        store.commit(MutationKeys.Unauthorized);
        next();
      }
    });
  }
}

export const $access = new AccessService();
