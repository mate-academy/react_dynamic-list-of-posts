import { Comment, CommentData } from '../types/Comment';
import { client } from './fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComments = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComments = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
