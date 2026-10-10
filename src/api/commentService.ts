import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getPostComments = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const createComment = (postId: number, data: CommentData) =>
  client.post<Comment>('/comments', { ...data, postId });

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);
