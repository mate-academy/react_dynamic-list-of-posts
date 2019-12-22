const usersURL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => fetch(usersURL)
  .then(response => response.json());
