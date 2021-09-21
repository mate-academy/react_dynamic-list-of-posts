import { request } from './posts';

export const getUsers = (): Promise<User[]> => {
  return request('/users');
};

export const getUser = (userId: number): Promise<User[]> => {
  return request(`/users/${userId}`);
};
