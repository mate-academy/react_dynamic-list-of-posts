import { BASE_URL } from './api';

export function getUserPosts(userId) {
  return fetch(`${BASE_URL}/posts/${userId}`)
    .then(response => response.json());
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
}
