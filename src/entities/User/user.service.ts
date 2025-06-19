import { client } from '../../utils/fetchClient';
import { User } from './User';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};
