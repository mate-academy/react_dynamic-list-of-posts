import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = async (): Promise<User[]> => {
  const response = await client.get<User[]>('/users');

  return response;
};
