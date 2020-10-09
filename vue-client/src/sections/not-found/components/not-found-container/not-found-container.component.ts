import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../../../libs';
import { $store } from '../../../../store';

@Component({
	template: files.insert('not-found', 'not-found-container'),
})
export class NotFoundContainer extends Vue {

	public mounted(): void {
		$store.setNotFound();
	}
}