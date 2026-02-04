import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getAllUsers = (): Promise<User[]> => {
  return client.get(`/users`);
};
