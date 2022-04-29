import { BASE_URL } from './api';

export function getPostComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}

export const createComments = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  })
    .then(response => response.json());
};

export const getDeleteComment = (id: number) => {
  return fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' })
    .then(response => response.json());
};
