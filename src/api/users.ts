import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsersFromServer = () => {
  return client.get<User[]>(`/users`);
};
