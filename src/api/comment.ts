import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
