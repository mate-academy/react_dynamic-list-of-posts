import { NewComment } from '../react-app-env';
import { BASE_URL, request } from './api';

export const getPostComments = async (postId: number) => {
  const response = await request(`${BASE_URL}/comments?postId=${postId}`, { method: 'GET' });

  return response;
};

export const deleteComment = async (commentId: number) => {
  await request(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async (comment: NewComment) => {
  await request(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(comment),
  });
};
