import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const result = await response.json();
  const { data } = result;

  return data.filter(comment => comment.postId === postId);
};

export const deleteComment = async commentId => fetch(
  `${BASE_URL}/comments/${commentId}`,
  { method: 'DELETE' },
);

export const addComment = async(postId, name, email, body) => fetch(
  `${BASE_URL}/comments/`,
  {
    method: 'POST',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  },
);
