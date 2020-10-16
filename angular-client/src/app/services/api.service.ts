import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Config, Effect, HttpOptions } from '../models';
import { Store } from '../store';
import { FailService } from './fail.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private requestIds = new Set<symbol>();
  private options: HttpOptions = {
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private fail: FailService,
    private store: Store,
  ) {}

  private start(): symbol {
    const id = Symbol();
    this.requestIds.add(id);
    this.store.setProgress(!!this.requestIds.size);
    return id;
  }

  private finish(id: symbol): void {
    this.requestIds.delete(id);
    this.store.setProgress(!!this.requestIds.size);
  }

  private effect<T>(id: symbol): Effect<T> {
    return [
      tap(() => this.finish(id)),
      catchError((response: HttpErrorResponse) => this.fail.throw(response)),
    ];
  }

  public get<T>(url: string): Observable<T> {
    const id = this.start();
    return this.http.get<T>(`${Config.ApiBaseUrl}/${url}`, this.options).pipe(...this.effect<T>(id));
  }

  public post<T>(url: string, body: object): Observable<T> {
    const id = this.start();
    return this.http.post<T>(`${Config.ApiBaseUrl}/${url}`, body, this.options).pipe(...this.effect<T>(id));
  }

  public put<T>(url: string, body: object): Observable<T> {
    const id = this.start();
    return this.http.put<T>(`${Config.ApiBaseUrl}/${url}`, body, this.options).pipe(...this.effect<T>(id));
  }

  public delete<T>(url: string): Observable<T> {
    const id = this.start();
    return this.http.delete<T>(`${Config.ApiBaseUrl}/${url}`, this.options).pipe(...this.effect<T>(id));
  }
}
