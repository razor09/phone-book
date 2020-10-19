import { store } from '../store';
import { MutationKeys } from '../store/mutations/mutation-keys';

class FailService {

  public reject(): Promise<never> {
    store.commit(MutationKeys.SetError);
    return Promise.reject();
  }
}

export const $fail = new FailService();
