import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getAllUsers = async () => {
  const users = await client.get<User[]>('/users');

  return users;
};
