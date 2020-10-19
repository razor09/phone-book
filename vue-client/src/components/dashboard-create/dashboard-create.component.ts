import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { Color, Text } from '../../models';
import { $contact } from '../../services';
import { ActionKeys } from '../../store/actions/action-keys';

@Component({
  template: files.insert('dashboard-create'),
})
export class DashboardCreate extends Vue {

  public contact = $contact.createSchema();

  public clearSchema(): void {
    utils.resetForm(this.$refs.formRef as HTMLFormElement);
    $contact.clearSchema(this.contact);
  }

  private notify(text: Text, color: Color): void {
    this.$store.dispatch(ActionKeys.Notify, { text, color });
  }

  public createContact(): void {
    if (!this.contact.name || !this.contact.number) {
      this.clearSchema();
      this.notify('Empty Fields', 'peru');
    } else {
      const contact = utils.removeTags(this.contact);
      $contact.createContact(contact).then(() => {
        this.clearSchema();
        this.notify('Created', 'darkslategray');
      });
    }
  }
}
