import { BASE_URL, COMMENTS } from './api';
import { Comment } from '../types';

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}${COMMENTS}?postId=${postId}`)
    .then(response => response.json());
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}${COMMENTS}/${commentId}`, { method: 'DELETE' })
    .then(response => response.json());
};

export const addComment = (comment: Comment) => {
  return fetch(`${BASE_URL}${COMMENTS}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
};
