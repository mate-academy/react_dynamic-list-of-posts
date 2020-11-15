import { request } from './api';

export const getUsers = async() => {
  const users = await request('/users');

  return users;
};
