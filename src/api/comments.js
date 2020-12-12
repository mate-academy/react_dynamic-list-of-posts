import { request } from './api';

export const getPostComments = postId => request(`comments/`)
  .then(result => result.filter(res => res.postId === postId));

export const addComment = (option) => {
  request(`comments/`, {
    method: 'POST',
    body: JSON.stringify(option),
  });
};

export const deleteComment = (commentId) => {
  request(`comments/${commentId}`, {
    method: 'DELETE',
  });
};
