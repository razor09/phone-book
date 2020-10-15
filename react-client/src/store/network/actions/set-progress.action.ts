import { utils } from '../../../libs';
import { GlobalAction } from '../../../models';
import { NetworkActionKeys } from '../network.action-keys';
import { NetworkState } from '../network.state';

export class SetProgressAction implements GlobalAction<NetworkActionKeys, boolean, NetworkState> {

	public type = NetworkActionKeys.SetProgress;

	constructor(public payload: boolean) {
		return utils.toPlainObject(this);
	}

	public reduce(state: NetworkState): NetworkState {
		return {
			...state,
			inProgress: this.payload,
		};
	}
}