import { post, request } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const removeComment = commentId => request(`/comments/${commentId}`, {
  method: 'DELETE',
});

export const addComment = body => post(`/comments`, body);
