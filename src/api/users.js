import { BASE_URL, USERS_URL, request } from './api';

export const getAllUsers = async() => {
  const response = await request(`${BASE_URL}${USERS_URL}`);

  return response;
};
