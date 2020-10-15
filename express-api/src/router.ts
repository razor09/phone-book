import { Router } from 'express';
import * as $ from './services';

export const router = Router()

.post(
	'/login',
	$.access.unauthorized.bind($.access),
	$.access.jsonified.bind($.access),
	$.auth.login.bind($.auth),
)

.get(
	'/check',
	$.auth.checkAuth.bind($.auth),
)

.delete(
	'/logout',
	$.access.authorized.bind($.access),
	$.auth.logout.bind($.auth),
)

.get(
	'/contacts',
	$.access.authorized.bind($.access),
	$.contact.receiveContacts.bind($.contact),
)

.get(
	'/contacts/:id',
	$.access.authorized.bind($.access),
	$.contact.receiveContact.bind($.contact),
)

.post(
	'/contacts',
	$.access.authorized.bind($.access),
	$.access.jsonified.bind($.access),
	$.contact.createContact.bind($.contact),
)

.put(
	'/contacts/:id',
	$.access.authorized.bind($.access),
	$.access.jsonified.bind($.access),
	$.contact.updateContact.bind($.contact),
)

.delete(
	'/contacts/:id',
	$.access.authorized.bind($.access),
	$.contact.removeContact.bind($.contact),
);