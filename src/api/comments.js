import * as api from './api';

export const getComments = postId => api.request(`/comments?postId=${postId}`);
// eslint-disable-next-line
export const postComment = (comment, postId) => api.post(`/comments?postId=${postId}`, comment);

export const deleteComment = commentId => api.remove(`/comments/${commentId}`);
