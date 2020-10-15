import { EitherAction } from '../../models';
import { authActionKeys } from './auth.action-keys';
import { AuthState } from './auth.state';

const defaultState: AuthState = {
	status: 'initialize',
	title: 'Login',
};

export const authReducer = (state = defaultState, action: EitherAction<AuthState>): AuthState => {
	return authActionKeys.includes(action.type) ? action.reduce(state) : state;
}