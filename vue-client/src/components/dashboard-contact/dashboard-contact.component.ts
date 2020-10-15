import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../libs';
import { $contact } from '../../services';
import { $store } from '../../store';

@Component({
	template: files.insert('dashboard-contact'),
	props: ['contact'],
})
export class DashboardContact extends Vue {

	public removeContact(id: number): void {
		$contact.removeContact(id).then(() => {
			$store.notify('Removed', 'firebrick');
		});
	}
}