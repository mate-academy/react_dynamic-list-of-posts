import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, data);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
