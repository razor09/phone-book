import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { Contact, Message } from '../../models';
import { $contact, $socket } from '../../services';
import { DashboardContact } from '../dashboard-contact/dashboard-contact.component';
import { DashboardCreate } from '../dashboard-create/dashboard-create.component';

@Component({
  template: files.insert('dashboard-list'),
  components: {
    'dashboard-create': DashboardCreate,
    'dashboard-contact': DashboardContact,
  },
})
export class DashboardList extends Vue {

  public query = '';
  public contacts = new Array<Contact>();
  private registry = new Array<Contact>();
  public search = utils.debounceFactory(this.filterContacts, 320);

  public mounted(): void {
    this.receiveContacts();
    $socket.client.on(Message.Create, this.receiveContacts.bind(this));
    $socket.client.on(Message.Update, this.receiveContacts.bind(this));
    $socket.client.on(Message.Remove, this.receiveContacts.bind(this));
  }

  public destroyed(): void {
    $socket.client.off(Message.Create);
    $socket.client.off(Message.Update);
    $socket.client.off(Message.Remove);
  }

  private receiveContacts(): void {
    $contact.receiveContacts().then((contacts) => {
      this.contacts = contacts;
      this.registry = contacts;
    });
  }

  private filterContacts(): void {
    this.contacts = this.registry.filter((contact) => {
      const pattern = contact.name.toLowerCase();
      const query = this.query.toLowerCase();
      return pattern.includes(query);
    });
  }
}
