import bodyParser from 'body-parser';
import express, { Request } from 'express';
import serverless from 'serverless-http';

import { CardController, UserController } from './controllers';

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

app.use((req: RequestWithApiGateway, _res, next) => {
  req.url = `/${req.apiGateway?.event.pathParameters?.proxy || ''}`;

  next();
});

app.post('/user', UserController.getUser);
app.post('/auth', UserController.authUser);
app.post('/card', CardController.getCard);
app.post('/deck', CardController.createDeck);

export const api = serverless(app);
