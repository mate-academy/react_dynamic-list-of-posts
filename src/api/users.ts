import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export function getAllUsers() {
  return client.get<User[]>('/users');
}
