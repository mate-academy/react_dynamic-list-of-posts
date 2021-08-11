import { post, request } from './api';

export const getComments = postId => request(`/comments?postId=${postId}`);

export const deleteComment = commentId => request(`/comments/${commentId}`, {
  method: 'DELETE',
});

export const addComment = body => post(`/comments`, body);
