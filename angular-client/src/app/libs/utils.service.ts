import { Injectable } from '@angular/core';
import { Pipe } from '../models';
import { Helpers } from './helpers.service';

@Injectable({
  providedIn: 'root',
})
export class Utils {

  constructor(
    private helpers: Helpers,
  ) {}

  public compose<T>(value: T): Pipe<T> {
    return {
      pipe: (callback) => {
        const result = callback(value);
        return this.compose(result);
      },
      result: () => value,
    };
  }

  public removeTags<T extends object>(body: T): T {
    const initial = new Object() as T;
    const pattern = /<\/?[^>]+>/gi;
    return Object.keys(body).reduce<T>((data, key) => {
      const value = body[key];
      return {
        ...data,
        [key]: this.helpers.isString(value) ? value.replace(pattern, '') : value,
      };
    }, initial);
  }

  public toInteger(value: string): number {
    return this.compose(value)
      .pipe(Number)
      .pipe(Math.ceil)
      .pipe(Math.abs)
      .result() || 0;
  }

  public resetForm(form: HTMLFormElement): void {
    form.reset();
    Array.from(form.elements).forEach((element) => {
      if (element instanceof HTMLInputElement) {
        element.blur();
      }
    });
  }

  public delay(callback: Function): void {
    self.setTimeout(callback, 960);
  }
}
