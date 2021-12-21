import { BASE_URL } from './api';
import { Comment } from '../types/Comment';

export const getPostComments = async (postId: number) => {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(data => data.filter(
      (item: Comment) => item.postId === postId,
    ));
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const postComment = (comment: Comment) => {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
