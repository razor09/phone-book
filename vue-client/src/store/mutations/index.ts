import { MutationTree } from 'vuex';
import { Notification } from '../../models';
import { GlobalState } from '../state/global-state';
import { MutationKeys } from './mutation-keys';

export const mutations: MutationTree<GlobalState> = {

  [MutationKeys.Authorized]: (state): void => {
    state.isAuth = true;
    state.title = 'Dashboard';
    self.document.title = 'Dashboard';
  },

  [MutationKeys.Unauthorized]: (state): void => {
    state.isAuth = false;
    state.title = 'Login';
    self.document.title = 'Login';
  },

  [MutationKeys.SetError]: (state): void => {
    state.isAuth = false;
    state.isError = true;
    state.title = 'Error';
    self.document.title = 'Error';
  },

  [MutationKeys.SetProgress]: (state, payload: boolean): void => {
    state.inProgress = payload;
  },

  [MutationKeys.CreateNotification]: (state, payload: Notification): void => {
    state.notifications = [...state.notifications, payload];
  },

  [MutationKeys.RemoveNotification]: (state, payload: symbol): void => {
    state.notifications = state.notifications.filter((notification) => notification.id !== payload);
  },
};
