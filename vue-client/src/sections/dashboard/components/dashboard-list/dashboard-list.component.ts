import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../../../libs';
import { Contact, Message } from '../../../../models';
import { $contact, $socket } from '../../../../services';
import { $store } from '../../../../store';

@Component({
	template: files.insert('dashboard', 'dashboard-list'),
})
export class DashboardList extends Vue {

	public query = '';
	public contact = $contact.createSchema();
	public contacts = new Array<Contact>();
	private registry = new Array<Contact>();
	public search = utils.debounceFactory(this.filterContacts, 320);

	public mounted(): void {
		$store.setTitle('Dashboard');
		this.receiveContacts();

		$socket.client.on(Message.Add, this.receiveContacts.bind(this));
		$socket.client.on(Message.Save, this.receiveContacts.bind(this));
		$socket.client.on(Message.Remove, this.receiveContacts.bind(this));
	}

	public destroyed(): void {
		$socket.client.off(Message.Add);
		$socket.client.off(Message.Save);
		$socket.client.off(Message.Remove);
	}

	public clearSchema(): void {
		utils.resetForm('dashboard-list-create-form');
		$contact.clearSchema(this.contact);
	}

	public filterContacts(): void {
		this.contacts = this.registry.filter((contact) => {
			const pattern = contact.name.toLowerCase();
			const query = this.query.toLowerCase();
			return pattern.includes(query);
		});
	}

	private receiveContacts(): void {
		$contact.receiveContacts().then((contacts) => {
			this.contacts = contacts;
			this.registry = contacts;
		});
	}

	public addContact(): void {
		if (!this.contact.name || !this.contact.number) {
			this.clearSchema();
			$store.notify('Empty Fields', 'peru');
		} else {
			const contact = utils.removeTags(this.contact);
			$contact.addContact(contact).then(() => {
				this.clearSchema();
				$store.notify('Added', 'darkslategray');
			});
		}
	}

	public removeContact(id: number): void {
		$contact.removeContact(id).then(() => {
			$store.notify('Removed', 'firebrick');
		});
	}
}