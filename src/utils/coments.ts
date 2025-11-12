import { client } from './fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const postComment = (newComment: Omit<Comment, 'id'>) =>
  client.post<Comment>('/comments', newComment);

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);
