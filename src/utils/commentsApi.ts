import { Comment, CommentData } from '../types/Comment';
import { client } from './fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const postComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};
