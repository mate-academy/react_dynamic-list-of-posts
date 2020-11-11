const BASE_URL = 'https://mate-api.herokuapp.com';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(comments => (postId === null
    ? comments.data
    : comments.data.filter(comment => comment.postId === postId)));

export const removePostComment = (commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const action = { method: 'DELETE' };

  return fetch(url, action);
};

export const addPostComment = (body, email, name, postId) => {
  const url = `${BASE_URL}/comments`;
  const action = {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  };

  return fetch(url, action);
};
