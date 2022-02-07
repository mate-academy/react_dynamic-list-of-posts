import { getData } from './api';

export function getUsers(): Promise<User[]> {
  return getData<User[]>('/users');
}
