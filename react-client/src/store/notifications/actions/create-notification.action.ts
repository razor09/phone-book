import { utils } from '../../../libs';
import { GlobalAction, Notification } from '../../../models';
import { NotificationsActionKeys } from '../notifications.action-keys';
import { NotificationState } from '../notifications.state';

export class CreateNotificationAction implements GlobalAction<NotificationsActionKeys, Notification, NotificationState> {

	public type = NotificationsActionKeys.CreateNotification;

	constructor(public payload: Notification) {
		return utils.toPlainObject(this);
	}

	public reduce(state: NotificationState): NotificationState {
		return {
			...state,
			notifications: [...state.notifications, this.payload],
		};
	}
}