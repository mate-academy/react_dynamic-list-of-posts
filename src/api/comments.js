import { request, post, remove } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  if (!postId) {
    return [];
  }

  return comments.filter(comment => comment.postId === postId);
};

export const addComment = async newComment => post('/comments', {
  ...newComment,
});

export const removeComment = async commentId => remove(
  `/comments/${commentId}`,
);
