import { COMMENTS_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(COMMENTS_URL);
  const comments = await response.json();

  return comments.data.filter(comment => comment.postId === postId);
};

export const deleteComment = async(commentId) => {
  const response = await fetch(`${COMMENTS_URL}${commentId}`, {
    method: 'DELETE',
  });

  return response;
};
