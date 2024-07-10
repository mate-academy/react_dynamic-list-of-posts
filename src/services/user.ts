import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export async function getUsers() {
  const users = await client.get<User[]>('/users');

  return users;
}
