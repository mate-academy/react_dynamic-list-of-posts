import { request } from './api';

export const getUsers = async (): Promise<User[]> => {
  return request('users');
};
