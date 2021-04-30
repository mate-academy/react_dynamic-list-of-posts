import { request } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const removeComment = (commentId, options) => (
  request(`/comments/${commentId}`, options)
);

export const addComment = (url, options) => request(url, options);
