const API_URL = 'https://jsonplaceholder.typicode.com';
const delay = () => new Promise((resolve) => {
  setTimeout(resolve, 500);
});

export const getPosts = () => delay()
  .then(() => fetch(`${API_URL}/posts`))
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);

export const getUsers = () => delay()
  .then(() => fetch(`${API_URL}/users`))
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);

export const getComments = () => delay()
  .then(() => fetch(`${API_URL}/comments`))
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
