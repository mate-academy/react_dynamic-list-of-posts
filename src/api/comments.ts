import { NewComment } from '../react-app-env';
import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deleteComment = async (commentId: number) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = async (comment: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(comment),
  });

  return response.json();
};
