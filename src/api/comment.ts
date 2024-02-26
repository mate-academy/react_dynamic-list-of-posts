import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const sendComment = (body: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', body);
};

export const delateComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
