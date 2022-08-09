import { Comment, NewComment } from '../react-app-env';
import { BASE_URL } from './api';

export const getPostComments = async (postId: number): Promise<Comment []> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deletePostComment = (commentId: number) => {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addPostComment = async (comment: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    });

  return response.json();
};
