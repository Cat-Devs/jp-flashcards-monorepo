import { User } from './types';

interface GetUserInput {
  username: string;
  password: string;
}

export const getUser = (userData: GetUserInput): Promise<User> => {
  return Promise.resolve({
    id: '123',
    name: 'John Doe',
    email: userData.username,
  });
};

export const auth = (userData: GetUserInput): Promise<User> => {
  return Promise.resolve({
    id: '123',
    name: 'John Doe',
    email: userData.username,
  });
};
