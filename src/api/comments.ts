import { CreateComment } from '../types/comment';
import { post, remove, request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return remove(`/comments/${commentId}`);
};

export const createComment = (body: CreateComment) => {
  post('/comments/', body);
};
