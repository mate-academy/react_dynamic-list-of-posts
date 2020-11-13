import { request } from './api';

export const getUsersList = async() => {
  const users = await request('/users');

  if (!users.length) {
    return [];
  }

  return users.slice(0, 9);
};
