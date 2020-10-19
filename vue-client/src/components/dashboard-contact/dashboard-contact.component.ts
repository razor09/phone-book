import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../libs';
import { Color, Text } from '../../models';
import { $contact } from '../../services';
import { ActionKeys } from '../../store/actions/action-keys';

@Component({
  template: files.insert('dashboard-contact'),
  props: ['contact'],
})
export class DashboardContact extends Vue {

  private notify(text: Text, color: Color): void {
    this.$store.dispatch(ActionKeys.Notify, { text, color });
  }

  public removeContact(id: number): void {
    $contact.removeContact(id).then(() => {
      this.notify('Removed', 'firebrick');
    });
  }
}
