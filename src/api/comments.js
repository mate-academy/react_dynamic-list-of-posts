import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(comments => comments.data.filter(comment => comment.postId === postId));
