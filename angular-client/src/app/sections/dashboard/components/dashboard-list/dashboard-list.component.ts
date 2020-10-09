import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Utils } from '../../../../libs';
import { Contact, Message } from '../../../../models';
import { ContactService, SocketService } from '../../../../services';
import { Store } from '../../../../store';

@Component({
	selector: 'dashboard-list',
	templateUrl: 'dashboard-list.component.html',
	styleUrls: ['dashboard-list.component.scss'],
})
export class DashboardList implements OnInit, OnDestroy {

	@ViewChild('formRef') private formRef: ElementRef<HTMLFormElement>;

	public query = '';
	public createForm = this.contactService.buildForm();
	public contacts = new Array<Contact>();

	constructor(
		private utils: Utils,
		private contactService: ContactService,
		private socket: SocketService,
		private store: Store,
	) {}

	public ngOnInit(): void {
		this.store.setTitle('Dashboard');
		this.receiveContacts();

		this.socket.client.on(Message.Add, this.receiveContacts.bind(this));
		this.socket.client.on(Message.Save, this.receiveContacts.bind(this));
		this.socket.client.on(Message.Remove, this.receiveContacts.bind(this));
	}

	public ngOnDestroy(): void {
		this.socket.client.off(Message.Add);
		this.socket.client.off(Message.Save);
		this.socket.client.off(Message.Remove);
	}

	private receiveContacts(): void {
		this.contactService.receiveContacts().pipe(first()).subscribe((contacts) => {
			this.contacts = contacts;
		});
	}

	public addContact(): void {
		if (this.createForm.invalid) {
			this.store.notify('Empty Fields', 'darkorange');
			this.utils.resetForm(this.formRef.nativeElement);
		} else {
			const contact = this.utils.removeTags<Contact>(this.createForm.value);
			this.contactService.addContact(contact).pipe(first()).subscribe(() => {
				this.store.notify('Added', 'darkgreen');
				this.utils.resetForm(this.formRef.nativeElement);
			});
		}
	}

	public removeContact(id: number): void {
		this.contactService.removeContact(id).pipe(first()).subscribe(() => {
			this.store.notify('Removed', 'darkred');
		});
	}
}