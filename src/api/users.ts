import { BASE_URL } from './api';

export const getAllUser = async (): Promise<User[]> => {
  const url = `${BASE_URL}/users`;

  const response = await fetch(url);

  return response.json();
};
