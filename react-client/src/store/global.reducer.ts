import { connect, MapStateToPropsParam } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { GlobalState } from './global.state';
import { networkReducer } from './network/network.reducer';
import { notificationsReducer } from './notifications/notifications.reducer';

const reducers = combineReducers<GlobalState>({ authReducer, networkReducer, notificationsReducer });

export const adapter = <S = object, P = object>(callback?: MapStateToPropsParam<S, P, GlobalState>) => {
  return connect<S, object, P, GlobalState>(callback);
}

export const store = createStore(reducers);
