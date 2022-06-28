import { User } from '../react-app-env';
import { BASE_URL } from './api';

export const getUsers = (): Promise<User[]> => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
};
