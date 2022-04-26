import { BASE_URL } from './api';

export function getPostComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}
