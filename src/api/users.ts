import { BASE_URL } from './api';
import { User } from '../react-app-env';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};
