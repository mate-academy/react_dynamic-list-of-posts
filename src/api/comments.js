import { request } from './api';

export const getPostComments = async postId => request('/comments')
  .then(comments => comments.filter(
    comment => comment.postId === postId,
  ));

export const deleteComment = async commentId => request(
  `/comments/${commentId}`,
  {
    method: 'DELETE',
  },
);

export const createComment = async data => request(
  `/comments`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  },
);
