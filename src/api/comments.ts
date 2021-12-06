import { BASE_URL } from './api';
import { Comment } from '../types/types';

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const comments = await response.json();

  return comments.filter((comment: Comment) => postId === comment.postId);
};

export const createComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  const result = await response.json();

  return result;
};

export const deleteComment = async (id: number) => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });

  const result = await response.json();

  return result;
};
