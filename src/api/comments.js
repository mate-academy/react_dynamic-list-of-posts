import { BASE_URL } from './api';

export const request = (url, options) => (
  fetch(`${BASE_URL}${url}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`can\n't upload your comment`);
      }

      return response.json();
    })
    .then(response => response.data)
);

export const getPostComments = (url, options) => (
  fetch(`${BASE_URL}${url}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`can\n't upload your comment`);
      }

      return response.json();
    })
    .then(response => response.data)
);

export const createComment = (name, postId, email, body) => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
      postId,
      email,
      body,
    }),
  })
    .then(response => response.json())
    .then(response => response.data)
);

export const remove = url => (
  request(url, { method: 'DELETE' })
);
