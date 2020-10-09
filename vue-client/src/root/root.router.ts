import Vue from 'vue';
import VueRouter from 'vue-router';
import * as sections from '../sections';
import { $access } from '../services';

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '',
			component: sections.LayoutContainer,
			children: [
				{
					path: '',
					component: sections.LoginContainer,
					beforeEnter: $access.unauthorized,
				},
				{
					path: 'contacts',
					component: sections.DashboardContainer,
					beforeEnter: $access.authorized,
					children: [
						{
							path: '',
							component: sections.DashboardList,
						},
						{
							path: ':id',
							name: 'edit',
							component: sections.DashboardEdit,
						},
					],
				},
				{
					path: 'error',
					component: sections.ErrorContainer,
				},
				{
					path: '*',
					component: sections.NotFoundContainer,
				},
			],
		},
	],
});