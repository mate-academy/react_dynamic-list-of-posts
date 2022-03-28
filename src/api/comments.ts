import { Comment } from '../react-app-env';
import { request } from './api';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return request('/comments?postId=', postId);
};

export const removeComment = (commentId: number) => {
  return request('/comments/', commentId, { method: 'DELETE' });
};

export const addComment = (comment: Comment) => {
  return request('/comments', '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(comment),
  });
};
