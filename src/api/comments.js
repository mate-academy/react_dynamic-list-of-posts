import { BASE_URL } from './api';

export const getPostComments = () => fetch(`${BASE_URL}/comments`)
  .then(response => response.json());

export const removePostComment = commentId => fetch(
  `${BASE_URL}/comments/${commentId}`,
  { method: 'DELETE' },
);

export const addPostComment = (
  postId,
  { nameInput, emailInput, bodyInput },
) => fetch(
  `${BASE_URL}/comments`,
  {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name: nameInput,
      email: emailInput,
      body: bodyInput,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  },
);
