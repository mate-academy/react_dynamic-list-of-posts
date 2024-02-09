import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

export const postComment = (comment: Omit<Comment, 'id'>): Promise<Comment> => {
  return client.post('/comments', comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
