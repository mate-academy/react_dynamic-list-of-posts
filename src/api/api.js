export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUserPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const result = await response.json();
  const { data } = result;

  return data;
};

export const getDateilPosts = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();
  const { data } = result;

  return data;
};

export const getComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  const result = await response.json();
  const { data } = result;

  return data;
};

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(response => response.json())
  .then(result => result.data);

const remove = (url) => {
  request(url, { method: 'DELETE' });
};

export const removeComment = id => remove(`/comments/${id}`);
export const addComment = (name, email, body, postId) => fetch(
  `${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
      email,
      body,
      postId,
    }),
  },
);
