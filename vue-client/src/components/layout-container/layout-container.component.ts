import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../libs';
import { $store } from '../../store';
import { LayoutHeader } from '../layout-header/layout-header.component';
import { LayoutNotifications } from '../layout-notifications/layout-notifications.component';
import { LayoutPreloader } from '../layout-preloader/layout-preloader.component';

@Component({
	template: files.insert('layout-container'),
	components: {
		'layout-header': LayoutHeader,
		'layout-preloader': LayoutPreloader,
		'layout-notifications': LayoutNotifications,
	},
})
export class LayoutContainer extends Vue {

	public get display(): boolean {
		return !$store.isError;
	}
}