import { BASE_URL, request } from './api';

export function getUsers() {
  return request(`${BASE_URL}/users`)
    .then(users => users.sort((previous, next) => (previous.id - next.id)))
    .then(users => users.slice(0, 10));
}
