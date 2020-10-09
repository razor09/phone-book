import { RootContainer } from '../root/root.component';
import { DashboardContainer, DashboardEdit, DashboardList } from './dashboard';
import { ErrorContainer } from './error';
import { LayoutContainer, LayoutHeader, LayoutPreloader } from './layout';
import { LoginContainer } from './login';
import { NotFoundContainer } from './not-found';

export const root = RootContainer;

export const components = [
	RootContainer,
	LayoutContainer,
	LayoutHeader,
	LayoutPreloader,
	LoginContainer,
	DashboardContainer,
	DashboardList,
	DashboardEdit,
	NotFoundContainer,
	ErrorContainer,
];

export const links = {
	LayoutContainer,
	LoginContainer,
	DashboardContainer,
	DashboardList,
	DashboardEdit,
	NotFoundContainer,
	ErrorContainer,
};