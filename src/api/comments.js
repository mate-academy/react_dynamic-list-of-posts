import { BASE_URL } from './api';

export const getPostComments = async(id) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${id}`);
  const result = await response.json();

  return result.data;
};

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(response => response.json())
  .then(result => result.data);

const remove = url => request(url, { method: 'DELETE' });

export const deleteComment = commentId => remove(`/comments/${commentId}`);

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
