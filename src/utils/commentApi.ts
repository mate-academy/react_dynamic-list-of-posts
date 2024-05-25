import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const getComment = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (commentData: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { ...commentData });
};
