import { Notification, Title } from '../../models';

export interface GlobalState {
  inProgress: boolean;
  isAuth: boolean;
  isError: boolean;
  title: Title;
  notifications: Notification[];
}
