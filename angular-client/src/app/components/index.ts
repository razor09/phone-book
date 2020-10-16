import { RootContainer } from '../root/root.component';
import { DashboardContact } from './dashboard-contact/dashboard-contact.component';
import { DashboardContainer } from './dashboard-container/dashboard-container.component';
import { DashboardCreate } from './dashboard-create/dashboard-create.component';
import { DashboardList } from './dashboard-list/dashboard-list.component';
import { DashboardUpdate } from './dashboard-update/dashboard-update.component';
import { LayoutContainer } from './layout-container/layout-container.component';
import { LayoutHeader } from './layout-header/layout-header.component';
import { LayoutPreloader } from './layout-preloader/layout-preloader.component';
import { LoginContainer } from './login-container/login-container.component';

export const components = [
  RootContainer,
  DashboardContact,
  DashboardContainer,
  DashboardCreate,
  DashboardList,
  DashboardUpdate,
  LayoutContainer,
  LayoutHeader,
  LayoutPreloader,
  LoginContainer,
];

export const links = {
  DashboardContainer,
  DashboardList,
  DashboardUpdate,
  LayoutContainer,
  LoginContainer,
};

export const root = RootContainer;
