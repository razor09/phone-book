import { Reducer } from 'redux';
import { EitherAction } from '../../models';
import { networkActionKeys } from './network.action-keys';
import { NetworkState } from './network.state';

const defaultState: NetworkState = {
  inProgress: false,
};

export const networkReducer: Reducer<NetworkState, EitherAction<NetworkState>> = (state = defaultState, action) => {
  return networkActionKeys.includes(action.type) ? action.reduce(state) : state;
}
