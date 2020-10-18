import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { Utils } from '../../libs';
import { Contact } from '../../models';
import { ContactService } from '../../services';
import { Store } from '../../store';

@Component({
  selector: 'dashboard-update',
  templateUrl: 'dashboard-update.component.html',
  styleUrls: ['dashboard-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUpdate implements OnInit {

  @ViewChild('formRef') private formRef: ElementRef<HTMLFormElement>;

  private id: number = null;
  public editForm = this.$contact.buildForm();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: Utils,
    private $contact: ContactService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.receiveContact();
  }

  private receiveContact(): void {
    this.activatedRoute.paramMap.pipe(
      map((params) => this.utils.toInteger(params.get('id'))),
      switchMap((id) => this.$contact.receiveContact(id)),
      first(),
    ).subscribe((contact) => {
      if (!!contact) {
        const { id, name, number } = contact;
        this.id = id;
        this.editForm.patchValue({ name, number });
      }
    });
  }

  public updateContact(): void {
    if (this.editForm.invalid) {
      this.store.notify('Empty Fields', 'darkorange');
      this.utils.resetForm(this.formRef.nativeElement);
    } else {
      const id = this.id;
      const contact = this.utils.removeTags<Contact>(this.editForm.value);
      const operation = !!id ? this.$contact.updateContact(id, contact) : this.$contact.createContact(contact);
      operation.pipe(first()).subscribe(() => {
        this.store.notify('Updated', 'darkgreen');
        this.router.navigateByUrl('contacts');
      });
    }
  }
}
