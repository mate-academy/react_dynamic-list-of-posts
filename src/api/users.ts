import { BASE_URL } from './api';

export const getUserByName = async (username: string) => {
  const response = await fetch(`${BASE_URL}/users?name=${username}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.text()}`);
  }

  return response.json();
};
