import { request, post, remove } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');
  const postComments = comments.filter(comment => comment.postId === postId);

  return postComments;
};

export const addComment = async({ name, postId, email, body }) => post(
  '/comments', {
    postId,
    name,
    email,
    body,
  },
);

export const deleteComment = commentId => remove(`/comments/${commentId}`);
