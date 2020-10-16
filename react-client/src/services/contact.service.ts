import { Contact } from '../models';
import { $api, $fail } from '../services';

class ContactService {

  public async receiveContacts(): Promise<Contact[]> {
    try {
      return await $api.get<Contact[]>('contacts');
    } catch {
      throw await $fail.reject();
    }
  }

  public async receiveContact(id: number): Promise<Contact> {
    try {
      return await $api.get<Contact>(`contacts/${id}`);
    } catch {
      throw await $fail.reject();
    }
  }

  public async createContact(contact: Contact): Promise<void> {
    try {
      await $api.post<void>('contacts', contact);
    } catch {
      throw await $fail.reject();
    }
  }

  public async updateContact(id: number, contact: Contact): Promise<void> {
    try {
      await $api.put<void>(`contacts/${id}`, contact);
    } catch {
      throw await $fail.reject();
    }
  }

  public async removeContact(id: number): Promise<void> {
    try {
      await $api.delete<void>(`contacts/${id}`);
    } catch {
      throw await $fail.reject();
    }
  }
}

export const $contact = new ContactService();
