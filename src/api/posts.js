import { BASE_URL } from './api';

export const getUserPosts = () => fetch(`${BASE_URL}/posts`)
  .then(response => response.json());

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json());

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(result => result.data.filter(comment => comment.postId === postId));

export const deleteComment = (commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  return fetch(url, options)
    .then(response => response.json());
};

export const addComment = (postId, name, email, body) => {
  const url = `${BASE_URL}/comments/`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  };

  return fetch(url, options)
    .then(response => response.json());
};
