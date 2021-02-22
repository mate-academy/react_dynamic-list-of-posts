'use_strict';

import { BASE_URL, request } from './api';

export const getComments = (postId) => {
  const commentsFromServer = request('/comments')
    .then(comments => comments.filter(comment => comment.postId === postId));

  return commentsFromServer;
};

export const createComment = (postId, data) => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Context-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      postId,
      name: data.name,
      email: data.email,
      body: data.body,
    }),
  }).then(response => response.json())
);

export const deleteComment = postId => (
  fetch(`${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
    headers: { 'Context-type': 'application/json; charset=UTF-8' },
  })
);
