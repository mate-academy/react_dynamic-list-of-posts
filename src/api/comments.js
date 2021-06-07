import { request } from './api';

export const getPostComments = postId => request('/comments')
  .then(comments => comments.filter(comment => comment.postId === postId));

export const deleteComment = async(commentId, options) => request(
  `/comments/${commentId}`,
  options,
);

export const createComment = data => request(`/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});
