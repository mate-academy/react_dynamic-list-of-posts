import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/`);
  const postComments = await response.json();

  const filteredPostComments = postComments.data.filter(postComment => (
    postComment.postId === postId));

  return filteredPostComments;
};

export const postCommentToServer = async(comment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    return 'Error';
  }

  const postComent = response.json();

  return postComent.data;
};

export const deleteCommentFromServer = async(commentId) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });

  if (!response.ok) {
    return 'Error';
  }

  const result = await response.json();

  return result.data;
};
