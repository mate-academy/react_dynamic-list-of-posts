import { get, post, remove } from './api';

export const getPostComments = postId => (get(`/comments?postId=${postId}`));
export const deleteComment = commentId => (remove('/comments/', commentId));
export const addComment = comment => (post('/comments', comment));
