import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsersList = () => {
  return client.get<User[]>('/users');
};
