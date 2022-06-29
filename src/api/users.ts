import { BASE_URL } from './api';

export const getAllUsers = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};
