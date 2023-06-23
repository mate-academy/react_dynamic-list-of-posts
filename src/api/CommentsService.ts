import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const removeComments = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComments = (data: {}) => {
  return client.post<Comment>('/comments/', data);
};
