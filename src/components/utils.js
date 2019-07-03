export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
export const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export function doFetch(url) {
  return fetch(url).then(response => response.json());
}
