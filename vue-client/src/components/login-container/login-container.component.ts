import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { $auth } from '../../services';
import { $store } from '../../store';

@Component({
	template: files.insert('login-container'),
})
export class LoginContainer extends Vue {

	public auth = $auth.createSchema();

	private clearSchema(): void {
		utils.resetForm(this.$refs.formRef as HTMLFormElement);
		$auth.clearSchema(this.auth);
	}

	public login(): void {
		if (!this.auth.user || !this.auth.password) {
			this.clearSchema();
			$store.notify('Empty Fields', 'peru');
		} else {
			const auth = utils.removeTags(this.auth);
			$auth.login(auth).then((isAuth) => {
				if (isAuth) {
					this.clearSchema();
					$store.notify('Welcome', 'darkslategray');
					utils.delay(() => {
						this.$router.push('/contacts');
					});
				} else {
					this.clearSchema();
					$store.notify('Login Failed', 'firebrick');
				}
			});
		}
	}
}