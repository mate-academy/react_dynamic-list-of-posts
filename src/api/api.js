export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUserPosts = (path, options) => (
  fetch(`${BASE_URL}/${path}`, options)
    .then(promise => promise.json())
    .then(result => result.data)
);

export const deleteComment = commentId => (
  getUserPosts(`comments/${commentId}`, {
    method: 'DELETE',
  }));

export const addComment = comment => (
  getUserPosts(`comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  }));
