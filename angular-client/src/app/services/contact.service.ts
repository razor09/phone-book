import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contact } from '../models';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class ContactService {

	constructor(
		private api: ApiService,
	) {}

	public buildForm(): FormGroup {
		return new FormGroup({
			name: new FormControl('', Validators.required),
			number: new FormControl('', Validators.required),
		});
	}

	public receiveContacts(): Observable<Contact[]> {
		return this.api.get<Contact[]>('contacts');
	}

	public receiveContact(id: number): Observable<Contact> {
		return this.api.get<Contact>(`contacts/${id}`);
	}

	public createContact(contact: Contact): Observable<void> {
		return this.api.post<void>('contacts', contact);
	}

	public updateContact(id: number, contact: Contact): Observable<void> {
		return this.api.put<void>(`contacts/${id}`, contact);
	}

	public removeContact(id: number): Observable<void> {
		return this.api.delete<void>(`contacts/${id}`);
	}
}