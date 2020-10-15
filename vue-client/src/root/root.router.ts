import Vue from 'vue';
import VueRouter from 'vue-router';
import * as links from '../components';
import { $access } from '../services';

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: links.LayoutContainer,
			children: [
				{
					path: '/',
					component: links.LoginContainer,
					beforeEnter: $access.unauthorized,
				},
				{
					path: '/contacts',
					component: links.DashboardContainer,
					beforeEnter: $access.authorized,
					children: [
						{
							path: '/',
							component: links.DashboardList,
						},
						{
							path: '/:id',
							name: 'edit',
							component: links.DashboardUpdate,
						},
					],
				},
				{
					path: '*',
					redirect: '/',
				},
			],
		},
	],
});