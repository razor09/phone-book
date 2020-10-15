import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../libs';

@Component({
	template: files.insert('dashboard-container'),
})
export class DashboardContainer extends Vue {}