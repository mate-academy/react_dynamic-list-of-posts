import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getAll = (): Promise<User[]> => {
  return client.get<User[]>('/users?limit=20') || null;
};

export const getById = async (id: number): Promise<User> => {
  const users = await client.get<User[]>(`/users/${id}`);

  return users[0];
};
