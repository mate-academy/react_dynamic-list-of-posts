import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComment = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const newComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
