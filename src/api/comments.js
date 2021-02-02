import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  let response = await fetch(`${BASE_URL}/comments`);

  response = await response.json();

  return response.data.filter(comment => comment.postId === postId);
};

export const removeComment = async(commentId) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

  return response.json();
};

export const addComment = async(postId, name, email, body) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
};
