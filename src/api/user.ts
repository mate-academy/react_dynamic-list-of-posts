import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};
