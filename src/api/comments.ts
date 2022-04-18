import { request } from './api';
import { Comment } from '../types/comment';

export const getPostComments = (postId?: number): Promise<Comment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const addComment = (comment: Comment) => {
  return request('/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
  });
};

export const removeComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
