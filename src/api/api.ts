export const BASE_URL = 'https://mate.academy/students-api';

export const getUsers = ():Promise<User[]> => {
  return fetch('../../api/users.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};
