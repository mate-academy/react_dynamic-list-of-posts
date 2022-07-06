import { BASE_URL } from './api';

export function getUsers() {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
}
