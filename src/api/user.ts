import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async (): Promise<User[]> => (
  client.get<User[]>('/users')
);
