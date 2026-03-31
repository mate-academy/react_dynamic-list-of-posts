import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getCommentsByPostId = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);

export const createComment = (data: Comment) =>
  client.post<Comment>('/comments', data);
