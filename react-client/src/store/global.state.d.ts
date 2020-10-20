import { AuthState } from './auth/auth.state';
import { NetworkState } from './network/network.state';
import { NotificationsState } from './notifications/notifications.state';

export interface GlobalState {
  authReducer: AuthState,
  networkReducer: NetworkState,
  notificationsReducer: NotificationsState,
}
