import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (CommentData: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', CommentData);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
