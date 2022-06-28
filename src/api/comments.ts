import { NewComment } from '../react-app-env';
import { BASE_URL } from './api';

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = (comment: NewComment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ comment }),
  })
    .then(response => response.json());
};
