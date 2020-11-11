import { request, post, remove } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  if (!postId) {
    return [];
  }

  return comments.filter(comment => comment.postId === postId);
};

export const addComment = newComment => post('/comments', {
  ...newComment,
});

export const removeComment = commentId => remove(`/comments/${commentId}`);
