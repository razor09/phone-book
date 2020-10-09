import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../../../libs';
import { Notification } from '../../../../models';
import { $store } from '../../../../store';

@Component({
	template: files.insert('layout', 'layout-notifications'),
})
export class LayoutNotifications extends Vue {

	public get notifications(): Notification[] {
		return $store.notifications;
	}
}