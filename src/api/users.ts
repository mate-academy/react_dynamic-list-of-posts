import { BASE_URL, request } from './api';

export const getAllUsers = async () => {
  return request(`${BASE_URL}/users`);
};
