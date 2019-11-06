const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export function getData(URL) {
  return fetch(URL).then(response => response.json());
}

export const getPostsList = () => getData(POSTS_URL);
export const getUsersList = () => getData(USERS_URL);
export const getCommentsList = () => getData(COMMENTS_URL);
