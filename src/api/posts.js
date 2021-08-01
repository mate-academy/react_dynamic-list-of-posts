import { BASE_URL } from './api';

export const getUserPosts = (userId = '', url) => (
  fetch(`${BASE_URL}${url}${userId}`)
    .then(user => user.json()).then(user => user.data));

export const removeComments = id => (
  fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }));

export const addComments = (id, data) => (
  fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(
      {
        ...data,
        postId: id,
      },
    ),
  })
);
