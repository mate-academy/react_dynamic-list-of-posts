import { request, remove, post } from './api';

export const getPostComments = async(postId) => {
  const postComments = await request('/comments');

  return postComments.filter(comment => comment.postId === postId);
};

export const deleteComment = commentId => remove(`/comments/${commentId}`);

export const postNewComment = async(
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
