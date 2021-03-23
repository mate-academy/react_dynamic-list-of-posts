const baseUrl = 'https://mate-api.herokuapp.com';

export const getPosts = () => (
  fetch(`${baseUrl}/posts`)
    .then(resolve => resolve.json()).then(result => result.data));

export const getPostsById = id => (
  fetch(`${baseUrl}/posts/${id}`)
    .then(resolve => resolve.json()).then(result => result.data));

export const getComentsById = postId => (
  fetch(`${baseUrl}/comments?postId=${postId}`)
    .then(resolve => resolve.json())
    .then(result => result.data));

export const deleteComment = (id) => {
  fetch(`${baseUrl}/comments/${id}`, {
    method: 'DELETE',
  });
};

export const postComment = (bodyData) => {
  fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers: {
      'Context-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(bodyData),
  });
};
