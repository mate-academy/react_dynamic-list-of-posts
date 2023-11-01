import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export function getUsers() {
  return client.get<User[]>('/users')
    .then((users) => users);
}
