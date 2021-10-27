import { request } from './api';

export const getUsers = async () => {
  const users: User[] = await request('/users');

  return users;
};
