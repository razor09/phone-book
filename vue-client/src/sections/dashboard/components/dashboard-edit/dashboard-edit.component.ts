import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../../../libs';
import { $contact } from '../../../../services';
import { $store } from '../../../../store';

@Component({
	template: files.insert('dashboard', 'dashboard-edit'),
})
export class DashboardEdit extends Vue {

	public contact = $contact.createSchema();

	public mounted(): void {
		this.receiveContact();
	}

	public clearSchema(): void {
		utils.resetForm('dashboard-edit-form');
		$contact.clearSchema(this.contact);
	}

	private receiveContact(): void {
		const id = utils.toInteger(this.$route.params.id);
		$contact.receiveContact(id).then((contact) => {
			if (!!contact) {
				$store.setTitle(contact.name);
				this.contact = contact;
			} else {
				$store.setTitle('New');
			}
		});
	}

	public saveContact(): void {
		if (!this.contact.name || !this.contact.number) {
			this.clearSchema();
			$store.notify('Empty Fields', 'peru');
		} else {
			const id = this.contact.id;
			const contact = utils.removeTags(this.contact);
			const action = !!id ? $contact.saveContact(id, contact) : $contact.addContact(contact);
			action.then(() => {
				this.clearSchema();
				$store.notify('Saved', 'darkslategray');
				this.$router.push('/contacts');
			});
		}
	}
}