import { BASE_URL } from './api';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    return await response.json();
  } catch (error) {
    throw new Error('Error');
  }
};
