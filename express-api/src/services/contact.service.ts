import { Request, Response } from 'express';
import { MysqlError } from 'mysql';
import { mysql, socket } from '../adapters';
import { utils } from '../libs';
import { Contact, Message, Status } from '../models';

class ContactService {

	public receiveContacts(_: Request, response: Response): void {
		const sql = 'SELECT * FROM contacts';
		mysql.query(sql, (error: MysqlError, contacts: Contact[]) => {
			!!error ? response.status(Status.InternalServerError).end() : response.json(contacts);
		});
	}

	public receiveContact(request: Request, response: Response): void {
		const id = utils.toInteger(request.params.id);
		const sql = 'SELECT * FROM contacts WHERE id = ?';
		mysql.query(sql, id, (error: MysqlError, contacts: Contact[]) => {
			if (!!error) {
				response.status(Status.InternalServerError).end();
			} else {
				const [contact] = contacts;
				response.json(contact);
			}
		});
	}

	public createContact(request: Request, response: Response): void {
		const contact = utils.removeTags<Contact>(request.body);
		const sql = 'INSERT INTO contacts SET ?';
		mysql.query(sql, contact, (error) => {
			if (!!error) {
				response.status(Status.InternalServerError).end();
			} else {
				socket.emit(Message.Create);
				response.end();
			}
		});
	}

	public updateContact(request: Request, response: Response): void {
		const contact = utils.removeTags<Contact>(request.body);
		const id = utils.toInteger(request.params.id);
		const sql = 'UPDATE contacts SET ? WHERE id = ?';
		mysql.query(sql, [contact, id], (error) => {
			if (!!error) {
				response.status(Status.InternalServerError).end();
			} else {
				socket.emit(Message.Update);
				response.end();
			}
		});
	}

	public removeContact(request: Request, response: Response): void {
		const id = utils.toInteger(request.params.id);
		const sql = 'DELETE FROM contacts WHERE id = ?';
		mysql.query(sql, id, (error) => {
			if (!!error) {
				response.status(Status.InternalServerError).end();
			} else {
				socket.emit(Message.Remove);
				response.end();
			}
		});
	}
}

export const contact = new ContactService();