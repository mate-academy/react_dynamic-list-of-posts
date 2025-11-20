import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: Comment['id']) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: Comment['id']) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};
