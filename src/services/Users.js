const USER_API = `https://jsonplaceholder.typicode.com/users`;

function getUsers() {
  return fetch(USER_API)
    .then(users => users.json());
}

export default getUsers;
