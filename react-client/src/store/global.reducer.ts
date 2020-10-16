import { combineReducers, createStore } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { GlobalState } from './global.state';
import { networkReducer } from './network/network.reducer';
import { notificationsReducer } from './notifications/notifications.reducer';

const reducers = combineReducers<GlobalState>({ authReducer, networkReducer, notificationsReducer });

export const store = createStore(reducers);
