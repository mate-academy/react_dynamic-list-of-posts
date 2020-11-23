import { request } from './api';

export const getPostComments = postId => request('comments')
  .then(result => result.filter(post => post.postId === postId));

export const deleteComment = commentId => request('comments', commentId,
  { method: 'DELETE' });

export const addComment = options => request('comments', '', options);
