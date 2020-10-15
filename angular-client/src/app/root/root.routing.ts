import { RouterModule } from '@angular/router';
import { links } from '../components';
import { guards } from '../guards';

export const RootRouting = RouterModule.forRoot([
	{
		path: '',
		component: links.LayoutContainer,
		children: [
			{
				path: '',
				component: links.LoginContainer,
				canActivate: [guards.Unauthorized],
			},
			{
				path: 'contacts',
				component: links.DashboardContainer,
				canActivate: [guards.Authorized],
				children: [
					{
						path: '',
						component: links.DashboardList,
					},
					{
						path: ':id',
						component: links.DashboardUpdate,
					},
				],
			},
			{
				path: '**',
				redirectTo: '',
			},
		],
	},
]);