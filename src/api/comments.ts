import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => (
  client.get<Comment[]>(`/comments?postId=${postId}`)
);

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);
