import { utils } from '../libs';
import { Color, Text, Title } from '../models';
import { store } from '../store/global.reducer';
import { CreateNotificationAction } from '../store/notifications/actions/create-notification.action';
import { RemoveNotificationAction } from '../store/notifications/actions/remove-notification.action';

export class NotificationsService {

	public setTitle(title: Title): void {
		self.document.title = title;
	}

	public push(text: Text, color: Color): void {
		const id = Symbol();
		const createAction = new CreateNotificationAction({ id, text, color });
		store.dispatch(createAction);
		utils.delay(() => {
			const removeAction = new RemoveNotificationAction(id);
			store.dispatch(removeAction);
		});
	}
}

export const $notifications = new NotificationsService();