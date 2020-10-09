import { Router } from 'express';
import * as $ from './services';

export const router = Router()

.post(
	'/login',
	$.guard.unauthorized.bind($.guard),
	$.guard.jsonified.bind($.guard),
	$.auth.login.bind($.auth),
)

.get(
	'/check',
	$.auth.checkAuth.bind($.auth),
)

.delete(
	'/logout',
	$.guard.authorized.bind($.guard),
	$.auth.logout.bind($.auth),
)

.get(
	'/contacts',
	$.guard.authorized.bind($.guard),
	$.contact.receiveContacts.bind($.contact),
)

.get(
	'/contacts/:id',
	$.guard.authorized.bind($.guard),
	$.contact.receiveContact.bind($.contact),
)

.post(
	'/contacts',
	$.guard.authorized.bind($.guard),
	$.guard.jsonified.bind($.guard),
	$.contact.addContact.bind($.contact),
)

.put(
	'/contacts/:id',
	$.guard.authorized.bind($.guard),
	$.guard.jsonified.bind($.guard),
	$.contact.saveContact.bind($.contact),
)

.delete(
	'/contacts/:id',
	$.guard.authorized.bind($.guard),
	$.contact.removeContact.bind($.contact),
);