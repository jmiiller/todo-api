import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import Bunyan from 'bunyan';
import { v4 as uuidv4 } from 'uuid';
import Config from './config';

interface GetTodoItemProps {
  id: string;
}

interface PutTodoItemProps {
  content: string;
}

interface DeleteTodoItemProps {
  id: string;
}

export default class DynamoBroker {
  private client: DocumentClient;

  private config: Config;

  private log: Bunyan;

  constructor({
    client,
    config,
    log,
  }: {
    client: DocumentClient;
    config: Config;
    log: Bunyan;
  }) {
    this.client = client;
    this.config = config;
    this.log = log;
  }

  async getTodoItem({ id }: GetTodoItemProps) {
    const params = {
      TableName: this.config.dynamoTableName,
      Key: {
        id,
      },
    };

    const response = await this.client.get(params).promise();

    return response.Item;
  }

  async putTodoItem({ content }: PutTodoItemProps) {
    const params = {
      TableName: this.config.dynamoTableName,
      Item: {
        id: uuidv4(),
        content,
      },
    };

    const response = await this.client.put(params).promise();

    return response.Attributes;
  }

  async deleteTodoItem({ id }: DeleteTodoItemProps) {
    const params = {
      TableName: this.config.dynamoTableName,
      Key: {
        id,
      },
    };

    const response = await this.client.delete(params).promise();

    return response.Attributes;
  }
}
