import { RouterModule } from '@angular/router';
import { guards } from '../guards';
import { links } from '../sections';

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
						component: links.DashboardEdit,
					},
				],
			},
			{
				path: 'error',
				component: links.ErrorContainer,
			},
			{
				path: '**',
				component: links.NotFoundContainer,
			},
		],
	},
]);