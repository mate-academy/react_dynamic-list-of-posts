import type { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (userId: number) => {
  return client.get<Comment[]>(`/comments?postId=${userId}`);
};

export const createComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
