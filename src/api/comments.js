import { request, post } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');
  const postComments = comments.filter(comment => comment.postId === postId);

  return postComments;
};

export const createComment = async(postId, name, email, body) => post(
  '/comments', {
    postId,
    name,
    email,
    body,
  },
);

const remove = url => request(url, { method: 'DELETE' });

export const removeComment = commentId => remove(`/comments/${commentId}`);
