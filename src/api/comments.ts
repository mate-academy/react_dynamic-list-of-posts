import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (commentId: number) => {
  return client.get<Comment[]>(`/comments?postId=${commentId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};
