import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { Color, Text, Title } from '../../models';
import { $auth } from '../../services';
import { ActionKeys } from '../../store/actions/action-keys';

@Component({
  template: files.insert('layout-header'),
})
export class LayoutHeader extends Vue {

  public get title(): Title {
    return this.$store.state.title;
  }

  public get isAuth(): boolean {
    return this.$store.state.isAuth;
  }

  private notify(text: Text, color: Color): void {
    this.$store.dispatch(ActionKeys.Notify, { text, color });
  }

  public logout(): void {
    $auth.logout().then(() => {
      this.notify('Bye', 'darkslategray');
      utils.delay(() => {
        this.$router.push('/');
      });
    });
  }
}
