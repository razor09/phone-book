import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../../../libs';
import { $store } from '../../../../store';

@Component({
	template: files.insert('error', 'error-container'),
})
export class ErrorContainer extends Vue {

	public mounted(): void {
		$store.setError();
	}
}