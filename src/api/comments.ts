import { Comment } from '../types/Comment';
import { BASE_URL, request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deletePostComment = (commentId: number) => {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addPostComment = async (newComment: Comment) => {
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
