import { createHash } from 'crypto';
import { Request, Response } from 'express';
import { MysqlError } from 'mysql';
import { mysql } from '../adapters';
import { utils } from '../libs';
import { Auth, Status, User } from '../models';

class AuthService {

  public login(request: Request, response: Response): void {
    const { user, password } = utils.removeTags<Auth>(request.body);
    const hash = createHash('md5').update(password).digest('hex');
    const sql = 'SELECT user FROM users WHERE user = ? AND password = ? LIMIT 1';
    mysql.query(sql, [user, hash], (error: MysqlError, users: User[]) => {
      if (!!error) {
        response.status(Status.InternalServerError).end();
      } else {
        request.session.isAuth = !!users.length;
        this.checkAuth(request, response);
      }
    });
  }

  public checkAuth(request: Request, response: Response): void {
    response.json(!!request.session.isAuth);
  }

  public logout(request: Request, response: Response): void {
    request.session.destroy(() => {
      response.end();
    });
  }
}

export const auth = new AuthService();
