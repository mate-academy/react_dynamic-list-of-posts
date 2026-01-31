import { Comment, CommentData } from '../types/Comment';
import { client } from './fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const postComments = (comment: CommentData) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComments = (id: number) => {
  return client.delete(`/comments/${id}`);
};
