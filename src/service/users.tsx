import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export function getUsers(url: string) {
  return client.get<User[]>(url);
}
