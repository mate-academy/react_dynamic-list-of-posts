import { User } from '../types/User';
import { client } from './fetchClient';

export function getUsers() {
  return client.get<User[]>('/users');
}
