import { EitherAction, Notification } from '../../models';
import { notificationsActionKeys } from './notifications.action-keys';
import { NotificationState } from './notifications.state';

const defaultState: NotificationState = {
  notifications: new Array<Notification>(),
};

export const notificationsReducer = (state = defaultState, action: EitherAction<NotificationState>): NotificationState => {
  return notificationsActionKeys.includes(action.type) ? action.reduce(state) : state;
}
