import { request } from './helpers';

export async function getUsers(): Promise<User[]> {
  return request('/users/');
}
