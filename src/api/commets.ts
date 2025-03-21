import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteCommentById = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (data: CommentData) => {
  return client.post<Comment>(`/comments`, data);
};
