import { Config, Reject, Resolve } from '../models';
import { $store } from '../store';

class ApiService {

  private requestIds = new Set<symbol>();

  private start(): symbol {
    const id = Symbol();
    this.requestIds.add(id);
    $store.setProgress(!!this.requestIds.size);
    return id;
  }

  private finish(id: symbol): void {
    this.requestIds.delete(id);
    $store.setProgress(!!this.requestIds.size);
  }

  private effect<T>(resolve: Resolve<T>, reject: Reject<XMLHttpRequest>, xhr: XMLHttpRequest): void {
    if (xhr.status < Config.Exception) {
      const data = !!xhr.responseText.length ? JSON.parse(xhr.responseText) as T : null;
      resolve(data);
    } else {
      reject(xhr);
    }
  }

  public get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.start();
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('get', `${Config.ApiBaseUrl}/${url}`, true);
      xhr.send();
      xhr.onload = () => this.effect(resolve, reject, xhr);
      xhr.onerror = () => reject(xhr);
      xhr.onloadend = () => this.finish(id);
    });
  }

  public post<T>(url: string, body: object): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.start();
      const data = JSON.stringify(body);
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('post', `${Config.ApiBaseUrl}/${url}`, true);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(data);
      xhr.onload = () => this.effect(resolve, reject, xhr);
      xhr.onerror = () => reject(xhr);
      xhr.onloadend = () => this.finish(id);
    });
  }

  public put<T>(url: string, body: object): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.start();
      const data = JSON.stringify(body);
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('put', `${Config.ApiBaseUrl}/${url}`, true);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(data);
      xhr.onload = () => this.effect(resolve, reject, xhr);
      xhr.onerror = () => reject(xhr);
      xhr.onloadend = () => this.finish(id);
    });
  }

  public delete<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.start();
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('delete', `${Config.ApiBaseUrl}/${url}`, true);
      xhr.send();
      xhr.onload = () => this.effect(resolve, reject, xhr);
      xhr.onerror = () => reject(xhr);
      xhr.onloadend = () => this.finish(id);
    });
  }
}

export const $api = new ApiService();
