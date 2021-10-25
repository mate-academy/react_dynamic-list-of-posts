import { BASE_URL } from './api';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const users = response.json();

  return users;
};
