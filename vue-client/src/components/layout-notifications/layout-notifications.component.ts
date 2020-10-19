import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../libs';
import { Notification } from '../../models';

@Component({
  template: files.insert('layout-notifications'),
})
export class LayoutNotifications extends Vue {

  public get notifications(): Notification[] {
    return this.$store.state.notifications;
  }
}
