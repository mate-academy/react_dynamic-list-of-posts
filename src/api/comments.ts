import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (comment: Omit<Comment, 'id'>) => {
  return client.post('/comments', comment);
};
