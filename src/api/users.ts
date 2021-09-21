import { request } from './api';

export const getUsers = (): Promise<User[]> => {
  return request('/users');
};

export const getUser = (userId: number): Promise<User[]> => {
  return request(`/users/${userId}`);
};
