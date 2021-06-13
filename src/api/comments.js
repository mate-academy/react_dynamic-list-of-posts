import { get, remove, post } from './api';

export const getPostComments = postId => get(`/comments?postId=${postId}`);

export const removeComment = commentId => remove(`/comments/${commentId}`);

export const addComment = data => post(`/comments`, data);
