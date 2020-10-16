import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { $contact } from '../../services';
import { $store } from '../../store';

@Component({
  template: files.insert('dashboard-create'),
})
export class DashboardCreate extends Vue {

  public contact = $contact.createSchema();

  public clearSchema(): void {
    utils.resetForm(this.$refs.formRef as HTMLFormElement);
    $contact.clearSchema(this.contact);
  }

  public createContact(): void {
    if (!this.contact.name || !this.contact.number) {
      this.clearSchema();
      $store.notify('Empty Fields', 'peru');
    } else {
      const contact = utils.removeTags(this.contact);
      $contact.createContact(contact).then(() => {
        this.clearSchema();
        $store.notify('Created', 'darkslategray');
      });
    }
  }
}
