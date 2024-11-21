import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const USER_ID = 1844;

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};
