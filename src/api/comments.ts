/* eslint-disable no-console */
import { Comment } from '../types/Comment';
import { request, BASE_URL } from './api';

export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`);

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
