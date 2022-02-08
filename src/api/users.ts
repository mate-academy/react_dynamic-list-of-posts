import { BASE_URL } from './api';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};
