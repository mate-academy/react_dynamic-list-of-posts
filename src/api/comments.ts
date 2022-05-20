/* eslint-disable no-console */
import { Comment } from '../types/Comment';
import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.text}`);
  }

  return response.json();
};

export const deleteCommentFromServer = async (id: number) => {
  await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
};

export const addComment = async (comment:Omit<Comment, 'id'>) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
