import Comment from '../types/commentType';
import { BASE_URL } from './api';

export const getPostComments = (postID:number): Promise<Comment[]> => {
  return fetch(`${BASE_URL}/comments?postId=${postID.toString()}`)
    .then(result => result.json());
};

export const addComment = (newComment: Partial<Comment>) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  };

  return fetch(`${BASE_URL}/comments`, options)
    .then(response => response.json());
};

export const deleteComment = (commentId: number): Promise<Comment> => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(response => response.json());
};
