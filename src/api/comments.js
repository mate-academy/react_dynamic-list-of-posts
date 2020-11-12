import { request, post, remove } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');
  const postComments = comments.filter(comment => comment.postId === postId);

  return postComments;
};

export const postComment = async postedComment => post('/comments', {
  ...postedComment,
});

export const removeComment = commentId => remove(`/comments/${commentId}`);
