import { request } from './helpers';

export async function getUsers() {
  const users = await request('/users/');

  return users;
}
