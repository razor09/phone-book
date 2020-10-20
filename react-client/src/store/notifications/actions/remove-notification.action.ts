import { utils } from '../../../libs';
import { GlobalAction } from '../../../models';
import { NotificationsActionKeys } from '../notifications.action-keys';
import { NotificationsState } from '../notifications.state';

export class RemoveNotificationAction implements GlobalAction<NotificationsActionKeys, symbol, NotificationsState> {

  public type = NotificationsActionKeys.RemoveNotification;

  constructor(public payload: symbol) {
    return utils.toPlainObject(this);
  }

  public reduce(state: NotificationsState): NotificationsState {
    return {
      ...state,
      notifications: state.notifications.filter((notification) => notification.id !== this.payload),
    };
  }
}
