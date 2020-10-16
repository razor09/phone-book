import { SetAuthStatusAction } from '../store/auth/actions/set-auth-status.action';
import { store } from '../store/global.reducer';
import { $notifications } from './notifications.service';

class FailService {

  public reject(): Promise<never> {
    const action = new SetAuthStatusAction('error');
    store.dispatch(action);
    $notifications.setTitle('Error');
    return Promise.reject();
  }
}

export const $fail = new FailService();
