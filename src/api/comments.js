import { COMMENTS_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(COMMENTS_URL);
  const comments = await response.json();

  return comments.data.filter(comment => comment.postId === postId);
};

export const addComment = async(comment) => {
  await fetch(COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
};

export const deleteComment = async(commentId) => {
  await fetch(`${COMMENTS_URL}${commentId}`, {
    method: 'DELETE',
  });
};
