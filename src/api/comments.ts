import { BASE_URL } from './api';
import { Comment, NewComment } from '../react-app-env';

export const getPostComments
  = async (postId: number): Promise<Comment []> => {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

    return response.json();
  };

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};

export const addComment = async (newComment: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};
