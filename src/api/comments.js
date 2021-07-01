import { post, remove, request } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const deleteComment = commentId => remove(`/comments/${commentId}`);

export const addComment = comment => post(`/comments`, comment);
