import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getUser = (user: User) => {
  return client.get<User>(`/users/${user.id}`);
};
