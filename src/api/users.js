import { request } from './api';

export const getUsers = async(userId) => {
  const users = await request('/users');

  return users;
};
