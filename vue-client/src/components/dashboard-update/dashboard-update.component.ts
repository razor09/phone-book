import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { Color, Text } from '../../models';
import { $contact } from '../../services';
import { ActionKeys } from '../../store/actions/action-keys';

@Component({
  template: files.insert('dashboard-update'),
})
export class DashboardUpdate extends Vue {

  public contact = $contact.createSchema();

  public mounted(): void {
    this.receiveContact();
  }

  public clearSchema(): void {
    utils.resetForm(this.$refs.formRef as HTMLFormElement);
    $contact.clearSchema(this.contact);
  }

  private notify(text: Text, color: Color): void {
    this.$store.dispatch(ActionKeys.Notify, { text, color });
  }

  private receiveContact(): void {
    const id = utils.toInteger(this.$route.params.id);
    $contact.receiveContact(id).then((contact) => {
      if (!!contact) {
        this.contact = contact;
      }
    });
  }

  public updateContact(): void {
    if (!this.contact.name || !this.contact.number) {
      this.clearSchema();
      this.notify('Empty Fields', 'peru');
    } else {
      const { id, name, number } = this.contact;
      const contact = utils.removeTags({ name, number });
      const operation = !!id ? $contact.updateContact(id, contact) : $contact.createContact(contact);
      operation.then(() => {
        this.clearSchema();
        this.notify('Updated', 'darkslategray');
        this.$router.push('/contacts');
      });
    }
  }
}
