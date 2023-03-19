import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const addComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};