import { request } from './api';

export const getComments = async() => request(`/comments`);

export const removeComment = async commentId => (
  request(`/comments/${commentId}`, { method: 'DELETE' })
);

export const addComment = async data => (
  request(`/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);
