import { BASE_URL } from './api';

export function getPostComments() {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(result => result.data);
}

export function deletePostComment(commentId) {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
}

export function addPostComment(postId, name, email, body) {
  fetch(`${BASE_URL}/comments`, {
    method: 'post',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
