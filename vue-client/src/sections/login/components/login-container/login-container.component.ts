import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../../../libs';
import { $auth } from '../../../../services';
import { $store } from '../../../../store';

@Component({
	template: files.insert('login', 'login-container'),
})
export class LoginContainer extends Vue {

	public auth = $auth.createSchema();

	public mounted(): void {
		$store.setTitle('Login');
	}

	private clearSchema(): void {
		utils.resetForm('login-container-auth-form');
		$auth.clearSchema(this.auth);
	}

	public login(): void {
		if (!this.auth.user || !this.auth.password) {
			this.clearSchema();
			$store.notify('Empty Fields', 'peru');
		} else {
			const auth = utils.removeTags(this.auth);
			$auth.login(auth).then((isAuth) => {
				if (!isAuth) {
					this.clearSchema();
					$store.notify('Login Failed', 'firebrick');
				} else {
					this.clearSchema();
					$store.notify('Welcome', 'darkslategray');
					utils.delay(() => {
						this.$router.push('/contacts');
					});
				}
			});
		}
	}
}