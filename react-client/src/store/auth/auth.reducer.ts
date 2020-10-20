import { Reducer } from 'redux';
import { EitherAction } from '../../models';
import { authActionKeys } from './auth.action-keys';
import { AuthState } from './auth.state';

const defaultState: AuthState = {
  status: 'initialize',
  title: 'Login',
};

export const authReducer: Reducer<AuthState, EitherAction<AuthState>> = (state = defaultState, action) => {
  return authActionKeys.includes(action.type) ? action.reduce(state) : state;
}
