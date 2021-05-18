import { BASE_URL, request } from './api';

export function getUsers() {
  return request(`${BASE_URL}/users`)
    .then(users => users.filter((elem, i, self) => i === 0 || elem.name !== self[i - 1].name));
}
