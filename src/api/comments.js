import { getData, post, remove } from './api';

export const getPostComments = async(postId) => {
  const comments = await getData('/comments');

  return comments.filter(comment => comment.postId === postId);
};

export const addComment = async newComment => (
  post('/comments', { ...newComment })
);

export const removeComment = async commentId => (
  remove(`/comments/${commentId}`)
);
