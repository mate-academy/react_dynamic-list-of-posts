import { BASE_URL } from './api';

export const getUsers = () => fetch(`${BASE_URL}/users`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  }).then(users => users.data.filter(user => user.id && user.name));
