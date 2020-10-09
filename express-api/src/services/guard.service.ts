import { NextFunction, Request, Response } from 'express';
import { Status } from '../models';

class GuardService {

	public unauthorized(request: Request, response: Response, next: NextFunction): void {
		!request.session.isAuth ? next() : response.status(Status.Conflict).end();
	}

	public authorized(request: Request, response: Response, next: NextFunction): void {
		!!request.session.isAuth ? next() : response.status(Status.Unauthorized).end();
	}

	public jsonified(request: Request, response: Response, next: NextFunction): void {
		!!request.is('json') ? next() : response.status(Status.BadRequest).end();
	}
}

export const guard = new GuardService();