import { BASE_URL, COMMENTS_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(BASE_URL + COMMENTS_URL);
  const comments = await response.json();

  return comments.data.filter(comment => comment.postId === postId);
};
