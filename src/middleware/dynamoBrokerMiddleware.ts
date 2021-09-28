import { Request, Response, NextFunction } from 'express';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import DynamoBroker from '../lib/dynamoBroker';

export default async function dynamoBrokerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const dynamoBroker = new DynamoBroker(
    new DocumentClient({ apiVersion: '2012-08-10' })
  );

  req.dynamoBroker = dynamoBroker;

  next();
}
