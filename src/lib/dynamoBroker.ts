import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

interface GetTodoItemProps {
  id: string;
}

interface PutTodoItemProps {
  id: string;
  content: string;
}

interface DeleteTodoItemProps {
  id: string;
}

export default class DynamoBroker {
  private client: DocumentClient;

  private tableName: string;

  constructor(client: DocumentClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  async getTodoItem({ id }: GetTodoItemProps) {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    await this.client.get(params);
  }

  async putTodoItem({ id, content }: PutTodoItemProps) {
    const params = {
      TableName: this.tableName,
      Item: {
        id,
        content,
      },
    };

    await this.client.put(params);
  }

  async deleteTodoItem({ id }: DeleteTodoItemProps) {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    await this.client.delete(params);
  }
}
