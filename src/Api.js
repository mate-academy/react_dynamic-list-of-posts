const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

export const getUsers = () => fetch(usersUrl)
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);

export const getPosts = () => fetch(postsUrl)
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);

export const getComments = () => fetch(commentsUrl)
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
