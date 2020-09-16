import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`)
    .then(result => result.json())
    .then(reply => reply.data);

  const comments = await response.filter(comment => comment.postId === postId);

  return comments;
};

export const deleteComment = async(commentId) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async(postId, name, email, body) => {
  await fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  });
};
