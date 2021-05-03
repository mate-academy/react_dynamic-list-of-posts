import { BASE_URL } from './api';

export function getUserPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(result => result.data);
}
