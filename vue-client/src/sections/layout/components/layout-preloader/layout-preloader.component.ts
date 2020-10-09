import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../../../libs';
import { $store } from '../../../../store';

@Component({
	template: files.insert('layout', 'layout-preloader'),
})
export class LayoutPreloader extends Vue {

	public get inProgress(): boolean {
		return $store.inProgress;
	}
}