import { Reducer } from 'redux';
import { EitherAction, Notification } from '../../models';
import { notificationsActionKeys } from './notifications.action-keys';
import { NotificationsState } from './notifications.state';

const defaultState: NotificationsState = {
  notifications: new Array<Notification>(),
};

export const notificationsReducer: Reducer<NotificationsState, EitherAction<NotificationsState>> = (state = defaultState, action) => {
  return notificationsActionKeys.includes(action.type) ? action.reduce(state) : state;
}
