import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/?postId=${postId}`);
  const body = await response.json();

  return body.data;
};

export const deletePostComment = async(commentId) => {
  const response = await fetch(
    `${BASE_URL}/comments/${commentId}`, { method: 'DELETE' },
  );

  return response;
};

export const createPostComment = async(comment) => {
  const response = await fetch(
    `${BASE_URL}/comments`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(comment),
    },
  );
  const body = await response.json();

  return body;
};
