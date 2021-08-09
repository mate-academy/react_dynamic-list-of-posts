import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const comments = await response.json();
  const unfilteredComments = await comments.data;

  if (postId === 0) {
    return unfilteredComments;
  }

  const filteredComments = unfilteredComments
    .filter(comment => comment.postId === postId);

  return filteredComments;
};

export const removeComment = async(id) => {
  await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });
};

export const addComment = async(comment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
};
