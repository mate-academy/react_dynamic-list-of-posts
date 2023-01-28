import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = (limit = 10) => {
  return client.get<User[]>(`/users?limit=${limit}`);
};
