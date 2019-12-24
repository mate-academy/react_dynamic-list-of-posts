const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => (response.ok ? response.json() : []))
  .catch(() => 'Error');

export default getUsers;
