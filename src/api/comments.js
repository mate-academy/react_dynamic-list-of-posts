import { request } from './api';

export const getPostComments = postId => request(`comments/`)
  .then(result => result.filter(res => res.postId === postId));

export const addComment = (postId, name, email, body) => {
  request(`comments/`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};

export const deleteComment = (commentId) => {
  request(`comments/${commentId}`, {
    method: 'DELETE',
  });
};
