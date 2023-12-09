import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import { apiGatewayMiddleware } from './middlewares';

export const app = express();

app.use(bodyParser.json());
app.use(apiGatewayMiddleware);
app.use('/api/v1', routes);
