import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const getComments = (postId: number) => {
  if (!postId || typeof postId !== 'number') {
    return Promise.resolve([]);
  }

  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComments = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComments = (commentsId: number) => {
  return client.delete(`/comments/${commentsId}`);
};

export const updateComments = ({ id, ...data }: Comment) => {
  return client.patch<Comment>(`/comments/${id}`, data);
};
