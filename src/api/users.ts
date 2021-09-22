import { BASE_URL } from './api';

export const getUsers = async () => {
  const users = await fetch(`${BASE_URL}/users`);

  if (!users.ok) {
    return [];
  }

  return users.json();
};
