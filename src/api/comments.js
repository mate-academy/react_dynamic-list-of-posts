import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const request = await fetch(`${BASE_URL}/comments/?postId=${postId}`);

  return request.json();
};

export const sendComment = async(postId, name, email, body) => {
  const request = await fetch(`${BASE_URL}/comments/`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    });

  return request.json();
};

export const deleteComment = commentId => fetch(
  `${BASE_URL}/comments/${commentId}`,
  { method: 'DELETE' },
);
