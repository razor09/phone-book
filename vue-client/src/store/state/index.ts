import { Notification } from '../../models';
import { GlobalState } from './global-state';

export const state: GlobalState = {
  inProgress: false,
  isAuth: false,
  isError: false,
  title: 'Login',
  notifications: new Array<Notification>(),
};
