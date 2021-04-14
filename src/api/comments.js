import { request, BASE_URL } from './api';

export const getComments = postId => request(`/comments?postId=${postId}`);

export const deleteComment = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  }));

export const addCommentToServer = comment => (fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    postId: comment.postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  }),
}).then(response => response.json()));
