import { BASE_URL } from './api';
import { Comment } from '../types';

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
};

export const createComment = (newComment: Comment) => {
  return fetch(`${BASE_URL}/comments/`, { method: 'POST', body: JSON.stringify(newComment) })
    .then(response => response.json());
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(response => response.json());
};
