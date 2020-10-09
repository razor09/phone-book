import Vue from 'vue';
import { files } from '../libs';
import { $store } from '../store';
import { router } from './root.router';

Vue.nextTick(() => {
	new Vue({
		el: '#root',
		template: files.root(),
		data: { $store },
		router,
	});
});