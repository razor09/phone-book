import * as _session from 'express-session';

export const session = _session({
	secret: 'hash',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365,
	},
});