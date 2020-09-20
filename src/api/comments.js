import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const comments = await fetch(`${BASE_URL}/comments`);

  return comments.json()
    .then(result => result.data.filter(comment => comment.postId === postId));
};

export const removeComment = async(commentId) => {
  const comment = await fetch(
    `${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' },
  );

  return comment.json()
    .then(result => result.data);
};

export const addComment = async(comment) => {
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
};
