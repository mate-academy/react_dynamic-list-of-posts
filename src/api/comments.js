import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const postComments = await fetch(`${BASE_URL}/comments/`);
  const response = await postComments.json();
  const result = response.data;

  return result.filter(comment => comment.postId === postId);
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
