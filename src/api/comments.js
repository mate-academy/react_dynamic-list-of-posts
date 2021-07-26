import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(comments => comments.data)
  .then(comments => comments.filter(comment => postId === comment.postId));

export const deleteComment = async(commentId) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addNewComment = async(comment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'Post',
    body: JSON.stringify(comment),
  });
};
