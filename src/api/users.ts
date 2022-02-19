import { BASE_URL } from './api';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);

  return res.json();
};
