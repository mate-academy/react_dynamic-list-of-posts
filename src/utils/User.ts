import { client } from './fetchClient';
import { User } from '../types/User';

export function getUsers() {
  return client.get<User[]>('/users');
}
