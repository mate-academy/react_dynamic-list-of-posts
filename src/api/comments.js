import { BASE_URL } from './api';

export const getPostComments = postId => (
  fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(result => result.data)
    .then(comments => comments.filter(comment => comment.postId === postId))
);

export const deleteComment = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(result => result.data)
);

export const addComment = data => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(result => result.data)
);
