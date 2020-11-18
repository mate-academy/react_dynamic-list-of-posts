import { post, remove, request } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  return comments.filter(comment => comment.postId === postId);
};

export const postComment = async(
  postId,
  name,
  email,
  body,
) => post('/comments', {
  postId,
  name,
  email,
  body,
});

export const deleteComment = commentId => remove(`/comments/${commentId}`);
