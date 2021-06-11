import { BASE_URL } from './api';

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments/`)
    .then(response => response.json())
    .then(
      comments => comments.data.filter(comment => comment.postId === postId),
    );
}

export function addNewComment(comment) {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }),
  })
    .then(response => response.json());
}

export function deleteComment(commentId) {
  return fetch(
    `${BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
    },
  );
}
