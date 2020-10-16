import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Contact, Message } from '../../models';
import { ContactService, SocketService } from '../../services';

@Component({
  selector: 'dashboard-list',
  templateUrl: 'dashboard-list.component.html',
  styleUrls: ['dashboard-list.component.scss'],
})
export class DashboardList implements OnInit, OnDestroy {

  public query = '';
  public contacts = new Array<Contact>();

  constructor(
    private $contact: ContactService,
    private socket: SocketService,
  ) {}

  public ngOnInit(): void {
    this.receiveContacts();
    this.socket.client.on(Message.Create, this.receiveContacts.bind(this));
    this.socket.client.on(Message.Update, this.receiveContacts.bind(this));
    this.socket.client.on(Message.Remove, this.receiveContacts.bind(this));
  }

  public ngOnDestroy(): void {
    this.socket.client.off(Message.Create);
    this.socket.client.off(Message.Update);
    this.socket.client.off(Message.Remove);
  }

  public trackById(_: number, contact: Contact): number {
    return contact.id;
  }

  private receiveContacts(): void {
    this.$contact.receiveContacts().pipe(first()).subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
}
