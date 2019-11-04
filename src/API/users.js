const URL = 'https://jsonplaceholder.typicode.com/users';

export default function getUsers() {
  return fetch(URL)
    .then(users => users.json());
}
