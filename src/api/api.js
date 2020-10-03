export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUsers = async() => fetch(`${BASE_URL}/users/`)
  .then(response => response.json())
  .then(data => data.data);

export const getPosts = async() => fetch(`${BASE_URL}/posts/`)
  .then(response => response.json())
  .then(data => data.data);

export const getPost = async id => fetch(`${BASE_URL}/posts/${id}`)
  .then(response => response.json())
  .then(data => data.data);

export const getComments = async() => fetch(`${BASE_URL}/comments/`)
  .then(response => response.json())
  .then(data => data.data);

export const deleteComment = async(id) => {
  const url = `${BASE_URL}/comments/${id}`;
  const options = {
    method: 'DELETE',
  };
  const comments = await fetch(url, options);

  return comments;
};

export const addComment = async(postId, name, email, body) => {
  const url = `${BASE_URL}/comments/`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  };

  return fetch(url, options);
};
