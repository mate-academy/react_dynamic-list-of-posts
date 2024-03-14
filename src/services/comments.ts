import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, comment);
};
