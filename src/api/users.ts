import { client } from '../libs/utils/fetchClient';
import { User } from '../libs/types';

export const loadUsers = (): Promise<User[]> => {
  return client.get<User[]>('/users');
};
