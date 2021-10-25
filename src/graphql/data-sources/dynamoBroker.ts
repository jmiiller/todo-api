import Bunyan from 'bunyan';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import {
  DeleteItemInput,
  GetItemInput,
  PutItemInput,
  ScanInput,
} from 'aws-sdk/clients/dynamodb';
import Config from '../../lib/config';
import { TodoItem } from '../types';

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
  private client: DynamoDB.DocumentClient;

  private config: Config;

  private log: Bunyan;

  constructor({
    client,
    config,
    log,
  }: {
    client: DynamoDB.DocumentClient;
    config: Config;
    log: Bunyan;
  }) {
    this.client = client;
    this.config = config;
    this.log = log;
  }

  async getTodoItems(): Promise<TodoItem[]> {
    const params = {
      TableName: this.config.dynamoTableName,
      Select: 'ALL_ATTRIBUTES',
    } as ScanInput;

    const response = await this.client.scan(params).promise();

    return response.Items as TodoItem[];
  }

  async getTodoItem({ id }: GetTodoItemProps): Promise<TodoItem> {
    const params = {
      TableName: this.config.dynamoTableName,
      Key: {
        id,
      },
    } as GetItemInput;

    const response = await this.client.get(params).promise();

    return response.Item as TodoItem;
  }

  async putTodoItem({ content }: PutTodoItemProps): Promise<TodoItem> {
    const id = uuidv4();
    const putParams = {
      TableName: this.config.dynamoTableName,
      Item: {
        id,
        content,
      },
    } as PutItemInput;

    await this.client.put(putParams).promise();

    const response = await this.getTodoItem({
      id,
    });

    return response;
  }

  async deleteTodoItem({ id }: DeleteTodoItemProps): Promise<TodoItem> {
    const params = {
      TableName: this.config.dynamoTableName,
      Key: {
        id,
      },
      ReturnValues: 'ALL_OLD',
    } as DeleteItemInput;

    const response = await this.client.delete(params).promise();

    return response.Attributes as TodoItem;
  }
}
