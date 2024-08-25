import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComments = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComments = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
