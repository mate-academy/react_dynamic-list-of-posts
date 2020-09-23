import { BASE_URL } from './api';

export const getUsers = async() => {
  const responce = await fetch(`${BASE_URL}/users`);
  const result = await responce.json();

  return result.data.slice(0, 10);
};
