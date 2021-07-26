import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(comments => comments.data)
  .then(comments => comments.filter(comment => postId === comment.postId));

export const deleteComment = (commentId) => {
  fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addNewComment = (comment) => {
  fetch(`${BASE_URL}/comments`, {
    method: 'Post',
    body: JSON.stringify(comment),
  });
};
