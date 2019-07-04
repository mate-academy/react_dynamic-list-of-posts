const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

function doFetch(url) {
  return fetch(url).then(response => response.json());
}

export const getUsers = () => doFetch(USERS_URL);
export const getPosts = () => doFetch(POSTS_URL);
export const getComments = () => doFetch(COMMENTS_URL);
