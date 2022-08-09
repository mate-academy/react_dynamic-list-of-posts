import { request } from './api';

export const loadUsers = (): Promise<User[]> => {
  return request('users');
};
