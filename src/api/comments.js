import { BASE_URL } from './api';

const removeComment = commentId => (
  {
    method: 'DELETE',
    body: JSON.stringify({
      commentId,
    }),
  }
);

const addComment = (postId, name, email, body) => (
  {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  }
);

export const getPostComments = function(postId) {
  return fetch(`${BASE_URL}/comments/?postId=${postId}`)
    .then(response => response.json())
    .then(response => response.data);
};

export const removePostComment = function(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, removeComment(commentId));
};

export const addPostComment = function(postId, name, email, body) {
  return fetch(`${BASE_URL}/comments/`, addComment(postId, name, email, body));
};
