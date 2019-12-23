const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => (
  fetch(API_URL).then(response => response.json())
);
