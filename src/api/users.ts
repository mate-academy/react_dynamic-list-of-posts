import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};
