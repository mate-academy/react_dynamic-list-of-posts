import { remove, request } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  return comments.data.filter(comment => comment.postId === postId);
};

export const deleteComment = (commentId) => {
  const commentUrl = `/comments/${commentId}`;

  return remove(commentUrl, { medthod: 'DELETE' });
};

export const addComment = (postId, name, email, body) => request('/comments', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    postId,
    name,
    email,
    body,
  }),
});
