import { remove, request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return remove(`/comments/${commentId}`);
};
