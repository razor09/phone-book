import { Injectable } from '@angular/core';
import { Property } from '../models';

@Injectable({
  providedIn: 'root',
})
export class Helpers {

  public isString(property: Property): property is string {
    return typeof property === 'string';
  }
}
