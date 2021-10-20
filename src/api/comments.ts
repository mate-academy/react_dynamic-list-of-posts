import { request } from './api';

export const getPostComments = (postId: number) => {
  return request(`comments?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return request(`comments/${commentId}`, { method: 'DELETE' });
};
