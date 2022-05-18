import { request } from './api';

export const getAllUsers = () => {
  return request('/users');
};
