import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const postComment = (comment: CommentData) =>
  client.post<Comment>('/comments', comment);

export const deleteComment = (id: number) => client.delete(`/comments/${id}`);
