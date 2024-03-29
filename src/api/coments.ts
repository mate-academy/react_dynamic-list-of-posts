import { Comment, CommentResponse } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const postComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<CommentResponse>(`/comments`, comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
