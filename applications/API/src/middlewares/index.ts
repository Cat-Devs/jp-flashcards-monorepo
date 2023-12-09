import { Request } from 'express';

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

export const apiGatewayMiddleware = (req: RequestWithApiGateway, _res, next) => {
  req.url = `/${req.apiGateway?.event.pathParameters?.proxy || ''}`;

  next();
};
