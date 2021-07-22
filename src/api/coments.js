import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const result = await fetch(`${BASE_URL}/comments/`)
    .then(response => response.json())
    .then(response => response.data)
    .then(response => response.filter(comment => comment.postId === postId));

  return result;
};

export const removeCommentFromServer = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
);

export const addNewComment = comment => (
  fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify(comment),
  })
);
