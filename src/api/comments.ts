import { BASE_URL, request } from './api';
import { Comment } from '../types/Comment';

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  return await request(`${BASE_URL}/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number): Promise<Response> => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Response> => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
