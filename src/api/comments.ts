import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: string) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (data: Omit<Comment, 'id'>) => {
  return client.post('/comments', data);
};

export const deleteComment = (url: string) => {
  return client.delete(`/comments/${url}`);
};
