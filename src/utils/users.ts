import { User } from '../types';
import { client } from './fetchClient';

export function getUsers() {
  return client.get<User[]>('/users');
}
