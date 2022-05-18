import { request } from './api';

export const getUsers = () => {
  return request('/users');
};
