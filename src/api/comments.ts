import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteCommentById = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const postComment = (comment: CommentData) => {
  return client.post<Comment>('/comments', comment);
};
