import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async () => {
  return client.get<User[]>('/users').then(res => res.slice(0, 10) as User[]);
};
