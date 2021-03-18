const baseUrl = 'https://mate-api.herokuapp.com';

export const getPosts = () => (
  fetch(`${baseUrl}/posts`)
    .then(resolve => resolve.json()).then(result => result.data));

export const getPostsById = id => (
  fetch(`${baseUrl}/posts/${id}`)
    .then(resolve => resolve.json()).then(result => result.data));

export const getComents = () => (
  fetch(`${baseUrl}/comments`)
    .then(resolve => resolve.json())
    .then(result => result.data));

export const deleteComment = (id) => {
  fetch(`${baseUrl}/comments/${id}`, {
    method: 'DELETE',
  });
};

export const writeComment = (bodyData) => {
  fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers: {
      'Context-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(bodyData),
  });
};
