import { BASE_URL } from './api';

export const getUsers = () => fetch(`${BASE_URL}/users`)
  .then(response => response.json());
