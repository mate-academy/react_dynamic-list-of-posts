import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number | undefined) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const postComment = (data: CommentData) => {
  return client.post<Comment>(`/comments`, data);
};
