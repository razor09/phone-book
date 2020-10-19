import { AuthState } from './auth/auth.state';
import { NetworkState } from './network/network.state';
import { NotificationState } from './notifications/notifications.state';

export interface GlobalState {
  authReducer: AuthState,
  networkReducer: NetworkState,
  notificationsReducer: NotificationState,
}
