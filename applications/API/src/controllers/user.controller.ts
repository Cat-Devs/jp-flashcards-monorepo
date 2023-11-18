import { Request, Response } from 'express';

import { logHelper } from '../helpers/log';
import { UserService } from '../services';
import { UserCredentials } from '../types';

export class UserController {
  static async getUser(req: Request, res: Response) {
    const { userId } = req?.body || {};
    if (!userId) {
      return res.status(400).send('Missing userId');
    }

    try {
      const user = await UserService.getUser(userId);
      return res.status(400).send(user);
    } catch (error) {
      return res.status(404).send('User not found');
    }
  }

  static async authUser(req: Request<object, object, UserCredentials>, res: Response) {
    const { username, password } = req?.body || {};
    logHelper('info', 'postAuth UserCredentials:', req?.body);

    if (!username || !password) {
      logHelper('error', 'Missing user credentials');
      return res.status(400).send('Missing user credentials');
    }

    try {
      const user = await UserService.auth({ username, password });
      logHelper('info', 'user found', user);
      return res.status(200).send(user);
    } catch (error) {
      logHelper('warn', 'Invalid user credentials');
      return res.status(401).send('Invalid user credentials');
    }
  }
}
