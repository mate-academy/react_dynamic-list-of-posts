import { BASE_URL } from './api';

export const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
};
