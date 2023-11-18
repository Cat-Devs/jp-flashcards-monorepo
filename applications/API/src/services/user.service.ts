import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';

import { dbClient } from './db.service';
import { TABLE_NAME } from '../config';
import { UserItem } from '../models';
import { User } from '../types';

interface GetUserInput {
  username: string;
  password: string;
}

export class UserService {
  static async getUser(username: string): Promise<User> {
    const user = new UserItem(username);

    const params: GetCommandInput = {
      TableName: TABLE_NAME,
      Key: user.keys(),
    };

    const data = await dbClient.send(new GetCommand(params));

    if (!data?.Item) {
      throw new Error(`Failed to retrieve user: "${username}"`);
    }

    return UserItem.fromItem(data.Item);
  }

  static async createUser(username: string, name: string, email: string): Promise<User> {
    const user = new UserItem(username, name, email);
    const params: PutCommandInput = {
      TableName: TABLE_NAME,
      ConditionExpression: 'attribute_not_exists(PK)',
      Item: user.toItem(),
    };

    await dbClient.send(new PutCommand(params));
    return user;
  }

  static async auth(userData: GetUserInput): Promise<User> {
    return Promise.resolve({
      id: '123',
      name: 'John Doe',
      email: userData.username,
    });
  }
}
