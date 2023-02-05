import { client } from '../utils/fetchClient';
import { User } from '../types';

export const getUsers = () => {
  return client.get<User[]>('/users');
};
