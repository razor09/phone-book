import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models';

@Pipe({
  name: 'search',
})
export class SearchFilter implements PipeTransform {

  public transform(contacts: Contact[], query: string): Contact[] {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase()));
  }
}
