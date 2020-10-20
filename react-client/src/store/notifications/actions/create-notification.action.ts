import { utils } from '../../../libs';
import { GlobalAction, Notification } from '../../../models';
import { NotificationsActionKeys } from '../notifications.action-keys';
import { NotificationsState } from '../notifications.state';

export class CreateNotificationAction implements GlobalAction<NotificationsActionKeys, Notification, NotificationsState> {

  public type = NotificationsActionKeys.CreateNotification;

  constructor(public payload: Notification) {
    return utils.toPlainObject(this);
  }

  public reduce(state: NotificationsState): NotificationsState {
    return {
      ...state,
      notifications: [...state.notifications, this.payload],
    };
  }
}
