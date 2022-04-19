import { BASE_URL } from './api';

export const getPostComments = async (postId: number | 0) => {
  const response = await fetch(`
  ${BASE_URL}/comments?postId=${postId}
  `);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}
      - StatusText: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

export const createComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await response.json();

  return data;
};

export const removeComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });

  const data = await response.json();

  return data;
};
