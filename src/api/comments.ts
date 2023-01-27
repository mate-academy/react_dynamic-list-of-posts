import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getByPostId = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteById = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const createNew = (comment: Omit<Comment, 'id'>) => {
  return client.post('/comments', comment);
};
