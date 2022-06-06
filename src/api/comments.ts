import { BASE_URL } from './api';
import { Comment } from '../types/Comment';
import { NewComment } from '../types/NewComment';

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  const comments: Comment[] = await response.json();

  return comments;
};

export const removeComment = async (commentId: number): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });

  return response.json();
};

export const addComment = async (newComment: NewComment): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });

  return response.json();
};
