import { utils } from '../../../libs';
import { GlobalAction } from '../../../models';
import { AuthActionKeys } from '../auth.action-keys';
import { AuthState, AuthStatus, AuthTitle } from '../auth.state';

export class SetAuthStatusAction implements GlobalAction<AuthActionKeys, AuthStatus, AuthState> {

  public type = AuthActionKeys.SetAuthStatus;

  private get title(): AuthTitle {
    switch (this.payload) {
      case 'unauthorized': return 'Login';
      case 'authorized': return 'Dashboard';
      case 'error': return 'Error';
    }
  }

  constructor(public payload: AuthStatus) {
    return utils.toPlainObject(this);
  }

  public reduce(state: AuthState): AuthState {
    return {
      ...state,
      title: this.title,
      status: this.payload,
    };
  }
}
