import { request } from './api';

export const getUsers = async (): Promise<User[]> => {
  const users = await request('/users');

  return users;
};
