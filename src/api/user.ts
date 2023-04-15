import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async (): Promise<User[]> => (
  client.get<User[]>('/users')
);

export const getUsers10 = async (): Promise<User[]> => (
  (await getUsers()).slice(0, 10)
);
