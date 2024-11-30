import { User } from '../types/User';
import { client } from './fetchClient';

export const userClient = {
  getAll() {
    return client.get<User[]>('/users');
  },
};
