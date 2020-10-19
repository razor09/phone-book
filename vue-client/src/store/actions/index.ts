import { ActionTree } from 'vuex';
import { utils } from '../../libs';
import { Notification } from '../../models';
import { MutationKeys } from '../mutations/mutation-keys';
import { GlobalState } from '../state/global-state';
import { ActionKeys } from './action-keys';

export const actions: ActionTree<GlobalState, GlobalState> = {

  [ActionKeys.Notify]: (context, payload: Notification): void => {
    const id = Symbol();
    context.commit(MutationKeys.CreateNotification, { id, ...payload });
    utils.delay(() => {
      context.commit(MutationKeys.RemoveNotification, id);
    });
  },
};
