import { BASE_URL } from './api';

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments/`)
    .then(response => response.json())
    .then(
      comments => comments.data.filter(comment => comment.postId === postId),
    );
}

export function addComment(comment) {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify(comment),
  })
    .then(result => result.json());
}
