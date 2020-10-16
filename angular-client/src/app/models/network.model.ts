import { OperatorFunction } from 'rxjs';

export const enum Config {
  ApiBaseUrl = 'http://localhost:3000',
  SocketBaseUrl = 'http://localhost:3200',
}

export const enum Message {
  Create = '[message]:create-contact',
  Update = '[message]:update-contact',
  Remove = '[message]:remove-contact',
}

export interface HttpOptions {
  withCredentials: boolean;
}

export type Effect<T> = [OperatorFunction<T, T>, OperatorFunction<T, T>];
