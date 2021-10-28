export const BASE_URL = 'https://mate.academy/students-api';

export const getUsers = () => (
  fetch(`${BASE_URL}/users`)
    .then(response => {
      if (!response.ok) {
        return new Error('Can\'t find source');
      }

      return response.json();
    })
);
