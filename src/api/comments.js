import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const result = await response.json();
  const comments = await result.data;

  if (postId !== 0) {
    return comments.filter(comment => postId === comment.postId);
  }

  return comments;
};

export const deletePostComment = async(commentId) => {
  await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });
};

export const addPostComment = async(newPostComment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(newPostComment),
  });
};
