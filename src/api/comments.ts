import { BASE_URL, request } from './api';
import { Comment } from '../types/coment';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async (comment: Comment) => {
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
