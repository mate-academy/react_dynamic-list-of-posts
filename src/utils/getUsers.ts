import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};
