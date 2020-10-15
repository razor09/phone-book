import { EitherAction } from '../../models';
import { networkActionKeys } from './network.action-keys';
import { NetworkState } from './network.state';

const defaultState: NetworkState = {
	inProgress: false,
};

export const networkReducer = (state = defaultState, action: EitherAction<NetworkState>): NetworkState => {
	return networkActionKeys.includes(action.type) ? action.reduce(state) : state;
}