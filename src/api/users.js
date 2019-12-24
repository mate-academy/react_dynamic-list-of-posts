const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => fetch(usersUrl)
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
