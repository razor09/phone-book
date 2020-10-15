import Vue from 'vue';
import Component from 'vue-class-component';
import { files, utils } from '../../libs';
import { Title } from '../../models';
import { $auth } from '../../services';
import { $store } from '../../store';

@Component({
	template: files.insert('layout-header'),
})
export class LayoutHeader extends Vue {

	public get title(): Title {
		return $store.title;
	}

	public get isAuth(): boolean {
		return $store.isAuth;
	}

	public logout(): void {
		$auth.logout().then(() => {
			$store.notify('Bye', 'darkslategray');
			utils.delay(() => {
				this.$router.push('/');
			});
		});
	}
}