import { request } from './api';

export const getUsers = () => {
  return request('/users.json', {}, `${process.env.PUBLIC_URL}/api`);
};
