import { BASE_URL } from './api';

export const getUsers = ():Promise<User[]> => {
  return fetch(`${BASE_URL}/users`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};
