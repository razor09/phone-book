import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { Utils } from '../../../../libs';
import { Contact } from '../../../../models';
import { ContactService } from '../../../../services';
import { Store } from '../../../../store';

@Component({
	selector: 'dashboard-edit',
	templateUrl: 'dashboard-edit.component.html',
	styleUrls: ['dashboard-edit.component.scss'],
})
export class DashboardEdit implements OnInit {

	@ViewChild('formRef') private formRef: ElementRef<HTMLFormElement>;

	private id: number = null;
	public editForm = this.contactService.buildForm();

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private utils: Utils,
		private contactService: ContactService,
		private store: Store,
	) {}

	public ngOnInit(): void {
		this.receiveContact();
	}

	private receiveContact(): void {
		this.activatedRoute.paramMap.pipe(
			map((params) => this.utils.toInteger(params.get('id'))),
			switchMap((id) => this.contactService.receiveContact(id)),
			first(),
		).subscribe((contact) => {
			if (!contact) {
				this.store.setTitle('New');
			} else {
				const { id, name, number } = contact;
				this.id = id;
				this.store.setTitle(name);
				this.editForm.patchValue({ name, number });
			}
		});
	}

	public saveContact(): void {
		if (this.editForm.invalid) {
			this.store.notify('Empty Fields', 'darkorange');
			this.utils.resetForm(this.formRef.nativeElement);
		} else {
			const id = this.id;
			const contact = this.utils.removeTags<Contact>(this.editForm.value);
			const action = !!id ? this.contactService.saveContact(id, contact) : this.contactService.addContact(contact);
			action.pipe(first()).subscribe(() => {
				this.store.notify('Saved', 'darkgreen');
				this.router.navigateByUrl('contacts');
			});
		}
	}
}