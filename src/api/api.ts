export const BASE_URL = 'https://mate.academy/students-api';

export const getUsers = (): Promise<User[]> => {
  return fetch(`${BASE_URL}/users/`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    })

    .then(users => users.slice(0, 10));
};
