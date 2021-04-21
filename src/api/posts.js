import { BASE_URL } from './api';

export function getUserPosts(userId) {
  const queryString = +userId === 0
    ? `${BASE_URL}/posts/`
    : `${BASE_URL}/posts?userId=${userId}`;

  return fetch(queryString)
    .then(response => response.json())
    .then(response => response.data);
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(response => response.data);
}
