import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};
