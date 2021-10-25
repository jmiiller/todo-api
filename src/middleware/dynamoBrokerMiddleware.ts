import { Request, Response, NextFunction } from 'express';
import { DynamoDB } from 'aws-sdk';
import DynamoBroker from '../graphql/data-sources/dynamoBroker';

export default async function dynamoBrokerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const dynamoBroker = new DynamoBroker({
    client: new DynamoDB.DocumentClient({
      apiVersion: '2012-08-10',
      region: 'us-west-2',
    }),
    config: req.config,
    log: req.log,
  });

  req.dynamoBroker = dynamoBroker;

  next();
}
