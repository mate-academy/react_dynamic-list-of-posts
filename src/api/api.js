export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUserPosts = (userId, options) => (
  fetch(`${BASE_URL}/${userId}`, options)
    .then(promise => promise.json())
    .then(result => result.data)
);

export const deleteComment = commentId => (
  getUserPosts(`comments/${commentId}`, {
    method: 'DELETE',
  }));

export const addComment = (name, email, body, postId) => (
  getUserPosts(`comments`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      body,
      postId,
    }),
  }));
