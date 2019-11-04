const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

export const getPosts = () => fetch(postsURL)
  .then(response => response.json());

export const getUsers = () => fetch(usersURL)
  .then(response => response.json());

export const getComments = () => fetch(commentsURL)
  .then(response => response.json());
