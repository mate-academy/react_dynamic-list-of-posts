import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/1comments?postId=${postId}`);
};

export const addComments = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComments = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
