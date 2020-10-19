import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { Color, Text } from '../../models';
import { $auth } from '../../services';
import { ActionKeys } from '../../store/actions/action-keys';

@Component({
  template: files.insert('login-container'),
})
export class LoginContainer extends Vue {

  public auth = $auth.createSchema();

  private clearSchema(): void {
    utils.resetForm(this.$refs.formRef as HTMLFormElement);
    $auth.clearSchema(this.auth);
  }

  private notify(text: Text, color: Color): void {
    this.$store.dispatch(ActionKeys.Notify, { text, color });
  }

  public login(): void {
    if (!this.auth.user || !this.auth.password) {
      this.clearSchema();
      this.notify('Empty Fields', 'peru');
    } else {
      const auth = utils.removeTags(this.auth);
      $auth.login(auth).then((isAuth) => {
        if (isAuth) {
          this.clearSchema();
          this.notify('Welcome', 'darkslategray');
          utils.delay(() => {
            this.$router.push('/contacts');
          });
        } else {
          this.clearSchema();
          this.notify('Login Failed', 'firebrick');
        }
      });
    }
  }
}
