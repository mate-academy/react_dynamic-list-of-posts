import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export function getUsers(): Promise<User[]> {
  return client.get<User[]>('/users');
}
