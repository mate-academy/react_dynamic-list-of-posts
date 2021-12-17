import { request } from './api';

export const getUsers = (userName?: string | null) => {
  if (userName) {
    return request(`/users?username=${userName}`);
  }

  return request('/users');
};
