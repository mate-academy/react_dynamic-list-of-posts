import { request } from './api';

export const getUsers = async () => {
  return request('/users');
};
