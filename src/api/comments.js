import { request } from './api';

export const getComments = async() => {
  const result = await request('/comments');

  return result.data;
};

export const postComments = async(comment) => {
  const result = await request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return result.data;
};

export const removeComments = async(commentId) => {
  const result = await request(`/comments/${commentId}`, { method: 'DELETE' });

  return result.data;
};
