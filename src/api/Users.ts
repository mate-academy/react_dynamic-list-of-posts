import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export function getUsers(): Promise<User[]> {
  return client.get('/users');
}
