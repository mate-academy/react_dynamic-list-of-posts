import { Comment } from '../types/Comment';
import { request } from './request';

export const getComments = () => {
  return request<Comment[]>('/comments');
};

export const addComment = (data: Comment) => {
  return request<Comment>('/comments', 'POST', data);
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, 'DELETE');
};
