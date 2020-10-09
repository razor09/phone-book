import * as _cors from 'cors';

export const cors = _cors({
	origin: ['http://localhost:4000', 'http://localhost:4200'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: 'Content-Type',
	credentials: true,
});