import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export function getAll() {
  return client.get<User[]>('/users');
}
