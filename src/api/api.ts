export const BASE_URL = 'https://mate.academy/students-api';

export const getUsers = () => {
  return fetch(`${BASE_URL}/users/`)
    .then(response => response.json())
    .then(result => result.splice(0, 10));
};
