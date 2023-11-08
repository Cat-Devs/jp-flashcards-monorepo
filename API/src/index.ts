import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';

import { auth } from './get-user';
import { UserCredentials } from './types';

interface ApiGatewayEvent {
  event: {
    pathParameters?: {
      proxy: string;
    };
  };
}

interface RequestWithApiGateway extends Request {
  apiGateway?: ApiGatewayEvent;
}

const app = express();

app.use(bodyParser.json());

app.use((req: RequestWithApiGateway, res, next) => {
  req.url = `/${req.apiGateway?.event.pathParameters?.proxy || ''}`;
  next();
});

app.post('/user', async (req: Request, res: Response) => {
  const { userId } = req?.body || {};
  if (!userId) {
    return res.status(400).send('Missing userId');
  }

  // const user = auth({ username, password });

  res.send('Users route');
});

app.post('/auth', async (req: Request<object, object, UserCredentials>, res: Response) => {
  const { username, password } = req?.body || {};

  if (!username || !password) {
    return res.status(400).send('Missing user credentials');
  }

  const user = await auth({ username, password });

  res.send(user);
});
app.get('/posts', async (req, res) => {
  // Your implementation here
  res.send('Posts route');
});

export const api = serverless(app);
