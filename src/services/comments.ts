import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const postComment = (comment: Omit<Comment, 'id'>) =>
  client.post<Comment>('/comments', { ...comment });

export const removeComment = (id: number) => client.delete(`/comments/${id}`);
