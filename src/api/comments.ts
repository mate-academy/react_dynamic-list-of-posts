import { Comment } from '../types/Comment';
import { BASE_URL, getData } from './api';

export const getPostComments = (): Promise<Comment[]> => {
  return getData<Comment[]>('/comments');
};

export const removeCommentById = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
    });
};

export const addComment = (newComment: Partial<Comment>): Promise<Comment> => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newComment),
  })
    .then(response => response.json());
};
