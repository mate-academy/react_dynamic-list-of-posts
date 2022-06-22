import { BASE_URL } from './api';
import { NewComment } from '../react-app-env';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' });

  return response.json();
};

export const addComment = async (newComment: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newComment),
    });

  return response.json();
};
