import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Utils } from '../../libs';
import { Contact } from '../../models';
import { ContactService } from '../../services';
import { Store } from '../../store';

@Component({
  selector: 'dashboard-create',
  templateUrl: 'dashboard-create.component.html',
  styleUrls: ['dashboard-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCreate {

  @ViewChild('formRef') private formRef: ElementRef<HTMLFormElement>;

  public createForm = this.$contact.buildForm();

  constructor(
    private utils: Utils,
    private $contact: ContactService,
    private store: Store,
  ) {}

  public createContact(): void {
    if (this.createForm.invalid) {
      this.store.notify('Empty Fields', 'darkorange');
      this.utils.resetForm(this.formRef.nativeElement);
    } else {
      const contact = this.utils.removeTags<Contact>(this.createForm.value);
      this.$contact.createContact(contact).pipe(first()).subscribe(() => {
        this.store.notify('Created', 'darkgreen');
        this.utils.resetForm(this.formRef.nativeElement);
      });
    }
  }
}
