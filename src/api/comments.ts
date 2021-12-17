import { request } from './api';
import { Comment } from '../types/types';

export const getPostComments = (postId?: number | null) => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = (comment: Comment) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
};
