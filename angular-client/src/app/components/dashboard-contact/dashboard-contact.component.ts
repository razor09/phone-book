import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Contact } from '../../models';
import { ContactService } from '../../services';
import { Store } from '../../store';

@Component({
  selector: 'dashboard-contact',
  templateUrl: 'dashboard-contact.component.html',
  styleUrls: ['dashboard-contact.component.scss'],
})
export class DashboardContact {

  @Input() public contact: Contact;

  constructor(
    private $contact: ContactService,
    private store: Store,
  ) {}

  public removeContact(id: number): void {
    this.$contact.removeContact(id).pipe(first()).subscribe(() => {
      this.store.notify('Removed', 'darkred');
    });
  }
}
