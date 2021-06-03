import { request } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const removeComments = commentId => request(`/comments/${commentId}`, {
  method: 'DELETE',
});

export const addComment = body => request(`/comments`, {
  method: 'POST',
  body: JSON.stringify(body),
});
