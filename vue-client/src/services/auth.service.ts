import { Auth } from '../models';
import { $api, $fail } from '../services';

class AuthService {

  public createSchema(): Auth {
    return {
      user: null,
      password: null,
    };
  }

  public clearSchema(auth: Auth): void {
    auth.user = null;
    auth.password = null;
  }

  public async login(auth: Auth): Promise<boolean> {
    try {
      return await $api.post<boolean>('login', auth);
    } catch {
      throw await $fail.reject();
    }
  }

  public async checkAuth(): Promise<boolean> {
    try {
      return await $api.get<boolean>('check');
    } catch {
      throw await $fail.reject();
    }
  }

  public async logout(): Promise<void> {
    try {
      await $api.delete<void>('logout');
    } catch {
      throw await $fail.reject();
    }
  }
}

export const $auth = new AuthService();
