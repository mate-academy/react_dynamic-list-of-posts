import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(comments => comments.data)
  .then(comments => comments.filter(comment => postId === comment.postId));

export const removeComment = commentId => fetch(
  `${BASE_URL}/comments/${commentId}`,
  { method: 'DELETE' },
);

export const addComment = comment => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(comment),
});
