import { BASE_URL } from './api';

export function getPostDetails(postId: number) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
}
